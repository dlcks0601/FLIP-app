import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Playlist } from '@/types/playlist.type';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLikePlaylist } from '@/hooks/playlist.query';

interface PlaylistItemProps {
  playlist: Playlist;
}

export default function PlaylistItem({ playlist }: PlaylistItemProps) {
  const router = useRouter();
  const { mutate: likePlaylist } = useLikePlaylist();

  const handleLike = (e: any) => {
    e.stopPropagation(); // 상위 TouchableOpacity의 onPress가 실행되지 않도록 함
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
            likePlaylist(playlist.postId.toString(), {
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
    <TouchableOpacity
      className='bg-[#282828] rounded-lg overflow-hidden'
      onPress={() => router.push(`/playlist/${playlist.postId}`)}
    >
      <Image
        source={{ uri: playlist.images?.[0].url }}
        className='w-full aspect-square'
      />
      <View className='flex-row justify-between items-center'>
        <View className='p-3'>
          <Text className='text-white text-lg font-semibold' numberOfLines={1}>
            {playlist.name}
          </Text>
          <Text className='text-gray-400 text-xs' numberOfLines={1}>
            {playlist.userNickname}
          </Text>
        </View>
        <View className='p-3'>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={playlist.isLiked ? 'heart' : 'heart-outline'}
              size={20}
              color={playlist.isLiked ? '#FF0000' : 'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
