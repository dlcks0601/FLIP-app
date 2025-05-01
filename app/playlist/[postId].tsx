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
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import {
  usePlaylists,
  useLikePlaylist,
  useAddComment,
  useComments,
} from '@/hooks/playlist.query';
import { Alert } from 'react-native';
import { deletePlaylist } from '@/apis/playlist.api';
import { useEffect, useState } from 'react';
import InfoTab from '@/app/components/playlist/InfoTab';
import CommentsTab from '@/app/components/playlist/CommentsTab';
import * as Haptics from 'expo-haptics';

type TabType = 'info' | 'comments';

export default function PlaylistDetailScreen() {
  const router = useRouter();
  const { data: playlistData } = usePlaylists();
  const { postId } = useLocalSearchParams();
  const numericPostId = Number(postId);
  const playlist = playlistData?.find((p) => p.postId === numericPostId);
  const { mutate: likePlaylist } = useLikePlaylist();
  const { mutate: addComment } = useAddComment();
  const { data: commentData } = useComments(postId as string);
  const comments = commentData?.comment;
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

            <TouchableOpacity
              className='absolute top-16 right-4'
              onPress={() => {
                Alert.alert('삭제', '삭제하시겠습니까?', [
                  { text: '취소', style: 'cancel' },
                  {
                    text: '삭제',
                    onPress: () => {
                      deletePlaylist(postId as string);
                    },
                  },
                ]);
              }}
            >
              <AntDesign name='ellipsis1' size={32} color='white' />
            </TouchableOpacity>
          </View>

          <View className='flex-col p-4'>
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
            <Text className='text-gray-400 mt-1 text-xl'>
              {playlist?.userNickname}
            </Text>
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
    </KeyboardAvoidingView>
  );
}
