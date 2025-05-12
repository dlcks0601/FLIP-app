import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
  Animated,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import {
  usePlaylists,
  useLikePlaylist,
  useAddComment,
  useComments,
} from '@/hooks/playlist.query';
import { useMyPagePlaylistQuery } from '@/hooks/mypage.query';
import { Alert } from 'react-native';
import { deletePlaylist } from '@/apis/playlist.api';
import { useEffect, useRef, useState } from 'react';
import InfoTab from '@/app/components/playlist/InfoTab';
import CommentsTab from '@/app/components/playlist/CommentsTab';
import * as Haptics from 'expo-haptics';
import useAuthStore from '@/store/authStore';
import { useFollowMutation } from '@/hooks/follow.query';

type TabType = 'info' | 'comments';

export default function PlaylistDetailScreen() {
  const router = useRouter();
  const { data: playlistData } = usePlaylists();
  const { data: myPlaylists } = useMyPagePlaylistQuery(true);
  const { data: likedPlaylists } = useMyPagePlaylistQuery(false);
  const { postId } = useLocalSearchParams();
  const numericPostId = Number(postId);
  const followMutation = useFollowMutation();

  const allPlaylists = [
    ...(playlistData || []),
    ...(myPlaylists || []),
    ...(likedPlaylists || []),
  ];
  const playlist = allPlaylists.find((p) => p.postId === numericPostId);

  const { mutate: likePlaylist } = useLikePlaylist();
  const { mutate: addComment } = useAddComment();
  const { data: commentData } = useComments(postId as string);

  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [commentContent, setCommentContent] = useState('');

  const totalTracks = playlist?.tracks?.total || 0;
  const totalDurationMs =
    playlist?.tracks?.items?.reduce(
      (acc, item) => acc + (item.track?.duration_ms || 0),
      0
    ) || 0;
  const totalMinutes = Math.floor(totalDurationMs / 60000);
  const totalSeconds = Math.floor((totalDurationMs % 60000) / 1000);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { userInfo } = useAuthStore();

  const isMyPlaylist = userInfo.userId === playlist?.userId;

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    nickname: string;
    isFollowed: boolean;
  } | null>(null);

  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: isUserModalVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isUserModalVisible]);

  const handleLike = () => {
    Alert.alert(
      playlist?.isLiked ? '플레이리스트 좋아요 취소' : '플레이리스트 좋아요',
      playlist?.isLiked
        ? '이 플레이리스트의 좋아요를 취소하시겠습니까?'
        : '이 플레이리스트를 좋아요 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: playlist?.isLiked ? '좋아요 취소' : '좋아요',
          onPress: () => {
            likePlaylist(postId as string, {
              onSuccess: () => {
                Alert.alert(
                  '알림',
                  playlist?.isLiked
                    ? '플레이리스트 좋아요가 취소되었습니다.'
                    : '플레이리스트를 좋아요 했습니다.'
                );
              },
              onError: () => {
                Alert.alert('오류', '처리 중 오류가 발생했습니다.');
              },
            });
          },
        },
      ]
    );
  };

  const handleAddComment = async () => {
    if (!commentContent.trim()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addComment({ postId: postId as string, content: commentContent });
    setCommentContent('');
  };

  const handleLongPressUser = () => {
    if (playlist) {
      setSelectedUser({
        id: String(playlist.userId),
        nickname: playlist.userNickname,
        isFollowed: commentData?.isFollowed || false,
      });
      setIsUserModalVisible(true);
    }
  };

  const handleFollow = () => {
    if (selectedUser) {
      Alert.alert(
        selectedUser.isFollowed ? '팔로우 취소' : '팔로우',
        selectedUser.isFollowed
          ? `${selectedUser.nickname}님을 팔로우 취소하시겠습니까?`
          : `${selectedUser.nickname}님을 팔로우 하시겠습니까?`,
        [
          { text: '취소', style: 'cancel' },
          {
            text: selectedUser.isFollowed ? '팔로우 취소' : '팔로우',
            onPress: () => {
              followMutation.mutate(selectedUser.id, {
                onSuccess: () => {
                  Alert.alert(
                    '알림',
                    selectedUser.isFollowed
                      ? '팔로우가 취소되었습니다.'
                      : '팔로우 되었습니다.'
                  );
                  setIsUserModalVisible(false);
                },
                onError: () => {
                  Alert.alert('오류', '처리 중 오류가 발생했습니다.');
                },
              });
            },
          },
        ]
      );
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'info') {
      return (
        <InfoTab
          totalTracks={totalTracks}
          totalMinutes={totalMinutes}
          totalSeconds={totalSeconds}
          playlist={playlist!}
        />
      );
    }
    return <CommentsTab />;
  };

  return (
    <KeyboardAvoidingView
      className='flex-1 bg-[#121212]'
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {isUserModalVisible && (
        <Animated.View
          pointerEvents='none'
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#00000045',
            opacity: overlayOpacity,
            zIndex: 10,
          }}
        />
      )}
      <View className='flex-1'>
        <Stack.Screen options={{ headerShown: false }} />

        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{
            paddingBottom: activeTab === 'comments' ? 0 : 30,
          }}
        >
          <View className='relative'>
            <Image
              source={{ uri: playlist?.images?.[0].url || '' }}
              className='w-full aspect-square'
            />

            <TouchableOpacity
              className='absolute top-16 left-4'
              onPress={() => router.back()}
            >
              <Feather name='chevron-left' size={32} color='white' />
            </TouchableOpacity>

            {isMyPlaylist && (
              <TouchableOpacity
                className='absolute top-16 right-4'
                onPress={() => {
                  Alert.alert('삭제', '삭제하시겠습니까?', [
                    { text: '취소', style: 'cancel' },
                    {
                      text: '삭제',
                      onPress: async () => {
                        try {
                          await deletePlaylist(postId as string);
                          router.replace('/(tabs)/playlist');
                        } catch (error) {
                          Alert.alert('오류', '삭제 중 오류가 발생했습니다.');
                        }
                      },
                    },
                  ]);
                }}
              >
                <AntDesign name='ellipsis1' size={32} color='white' />
              </TouchableOpacity>
            )}
          </View>

          <View className='flex-col p-4 gap-3'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-white text-4xl font-bold'>
                {playlist?.name}
              </Text>
              <View className='flex-row items-center gap-2'>
                <View className='flex-row items-center gap-2'>
                  <Ionicons name='chatbubble-outline' size={22} color='white' />
                  <Text className='text-white text-xl font-medium'>
                    {commentData?.commentCount}
                  </Text>
                </View>
                <View className='flex-row items-center gap-2'>
                  <TouchableOpacity onPress={handleLike}>
                    <Ionicons
                      name={playlist?.isLiked ? 'heart' : 'heart-outline'}
                      size={24}
                      color={playlist?.isLiked ? '#FF0000' : 'white'}
                    />
                  </TouchableOpacity>
                  <Text className='text-white text-xl font-medium'>
                    {playlist?.likeCount}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text className='text-gray-300 text-sm'>
                {commentData?.explanation}
              </Text>
            </View>
            <View className='flex-row items-center gap-2 mt-1'>
              <Image
                source={{ uri: playlist?.userProfileUrl }}
                className='w-5 h-5 rounded-full'
              />
              {!isMyPlaylist ? (
                <TouchableOpacity onLongPress={handleLongPressUser}>
                  <Text className='text-white text-md font-bold'>
                    {playlist?.userNickname}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text className='text-white text-md font-bold'>
                  {playlist?.userNickname}
                </Text>
              )}
            </View>
          </View>

          <View className='flex-row border-b border-gray-800'>
            <TouchableOpacity
              className={`flex-1 px-4 py-2 ${
                activeTab === 'info' ? 'border-b-2 border-[#1DB954]' : ''
              }`}
              onPress={() => setActiveTab('info')}
            >
              <Text
                className={`text-center text-lg font-bold ${
                  activeTab === 'info' ? 'text-[#1DB954]' : 'text-gray-400'
                }`}
              >
                정보
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 px-4 py-2 ${
                activeTab === 'comments' ? 'border-b-2 border-[#1DB954]' : ''
              }`}
              onPress={() => setActiveTab('comments')}
            >
              <Text
                className={`text-center text-lg font-bold ${
                  activeTab === 'comments' ? 'text-[#1DB954]' : 'text-gray-400'
                }`}
              >
                댓글
              </Text>
            </TouchableOpacity>
          </View>

          {renderTabContent()}
        </ScrollView>

        {activeTab === 'comments' && (
          <View
            className={`bg-[#121212] border-t border-gray-800 px-4 py-3 flex-row items-center ${
              !isKeyboardVisible ? 'pb-10' : ''
            }`}
          >
            <TextInput
              className='flex-1 bg-[#282828] text-white rounded-lg px-4 py-3 mr-2'
              placeholder='댓글을 입력하세요...'
              placeholderTextColor='#666'
              value={commentContent}
              onChangeText={setCommentContent}
              onSubmitEditing={handleAddComment}
              returnKeyType='send'
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Text className='text-[#1ED760] font-bold'>등록</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={isUserModalVisible}
        onRequestClose={() => setIsUserModalVisible(false)}
      >
        <View className='flex-1 justify-end'>
          <View className='bg-[#1E1E1E] rounded-t-3xl h-1/4'>
            <View className='items-center py-4'>
              <View className='w-12 h-1 bg-gray-600 rounded-full mb-4' />
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsUserModalVisible(false);
                router.push({
                  pathname: '/mypage/user/[targetUserId]',
                  params: { targetUserId: playlist?.userId?.toString() || '' },
                });
              }}
              className='py-4 px-6 border-b border-gray-800'
            >
              <Text className='text-white text-lg text-center'>
                {selectedUser?.nickname} 페이지
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFollow} className='py-4 px-6'>
              <Text
                className={`text-lg text-center ${
                  selectedUser?.isFollowed ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                {selectedUser?.isFollowed ? '팔로잉' : '팔로우'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsUserModalVisible(false)}
              className='py-4 px-6 border-t border-gray-800'
            >
              <Text className='text-gray-400 text-lg text-center'>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
