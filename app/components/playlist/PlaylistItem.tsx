import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Playlist } from '@/types/playlist.type';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLikePlaylist } from '@/hooks/playlist.query';
import * as Haptics from 'expo-haptics';

interface PlaylistItemProps {
  playlist: Playlist;
}

export default function PlaylistItem({ playlist }: PlaylistItemProps) {
  const router = useRouter();
  const { mutate: likePlaylist } = useLikePlaylist();

  const handleLike = async (e: any) => {
    e.stopPropagation();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Alert.alert(
      playlist.isLiked ? '플레이리스트 좋아요 취소' : '플레이리스트 좋아요',
      playlist.isLiked
        ? '이 플레이리스트의 좋아요를 취소하시겠습니까?'
        : '이 플레이리스트를 좋아요 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: playlist.isLiked ? '좋아요 취소' : '좋아요',
          onPress: async () => {
            await Haptics.impactAsync(
              playlist.isLiked
                ? Haptics.ImpactFeedbackStyle.Light
                : Haptics.ImpactFeedbackStyle.Light
            );

            likePlaylist(playlist.postId.toString(), {
              onSuccess: () => {
                Alert.alert(
                  '알림',
                  playlist.isLiked
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

  return (
    <TouchableOpacity
      className='bg-[#282828] rounded-lg overflow-hidden'
      onPress={() => router.push(`/playlist/${playlist.postId}`)}
    >
      <Image
        source={{ uri: playlist.images?.[0].url }}
        className='w-full aspect-square'
      />
      <View className='flex-row flex-1 justify-between items-center p-3'>
        <View className='flex-col'>
          <Text className='text-white text-lg font-semibold' numberOfLines={1}>
            {playlist.name}
          </Text>
          <Text className='text-gray-400 text-xs' numberOfLines={1}>
            {playlist.userNickname}
          </Text>
        </View>
        <View className='flex-row items-center gap-1'>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={playlist.isLiked ? 'heart' : 'heart-outline'}
              size={18}
              color={playlist.isLiked ? '#FF0000' : 'white'}
            />
          </TouchableOpacity>
          <Text className='text-white text-sm'>{playlist.commentCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
