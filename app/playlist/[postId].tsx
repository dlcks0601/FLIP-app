import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { usePlaylists, useLikePlaylist } from '@/hooks/playlist.query';
import { Alert } from 'react-native';
import { deletePlaylist } from '@/apis/playlist.api';

export default function PlaylistDetailScreen() {
  const router = useRouter();
  const { data: playlistData } = usePlaylists();
  const { postId } = useLocalSearchParams();
  const numericPostId = Number(postId);
  const playlist = playlistData?.find((p) => p.postId === numericPostId);
  const { mutate: likePlaylist } = useLikePlaylist();

  const handleLike = () => {
    Alert.alert(
      '플레이리스트 좋아요',
      '이 플레이리스트를 좋아요 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '좋아요',
          onPress: () => {
            likePlaylist(postId as string, {
              onSuccess: () => {
                Alert.alert('알림', '플레이리스트를 좋아요 했습니다.');
              },
              onError: () => {
                Alert.alert('오류', '좋아요 처리 중 오류가 발생했습니다.');
              },
            });
          },
        },
      ]
    );
  };

  return (
    <View className='flex-1 bg-[#121212]'>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className='relative'>
        <Image
          source={{ uri: playlist?.images?.[0].url || '' }}
          className='w-full aspect-square'
        />

        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          className='absolute top-16 left-4'
          onPress={() => router.back()}
        >
          <Feather name='chevron-left' size={32} color='white' />
        </TouchableOpacity>
        {/* 삭제 버튼 */}
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

      <View className='flex-row justify-between items-center p-4'>
        <View className='flex-col'>
          <Text className='text-white text-4xl font-bold'>
            {playlist?.name}
          </Text>
          <Text className='text-gray-400 mt-1 text-xl'>
            {playlist?.userNickname}
          </Text>
        </View>

        {/* 좋아요 버튼 */}
        <TouchableOpacity onPress={handleLike}>
          <Ionicons
            name={playlist?.isLiked ? 'heart' : 'heart-outline'}
            size={28}
            color={playlist?.isLiked ? '#FF0000' : 'white'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
