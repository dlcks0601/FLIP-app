import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Playlist } from '@/types/playlist.type';

interface MyPlaylistItemProps {
  playlist: Playlist;
}

export default function MyPlaylistItem({ playlist }: MyPlaylistItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/playlist/${playlist.postId}`)}
      className='flex-row items-center gap-3 p-2'
    >
      <Image
        source={{ uri: playlist.images?.[0]?.url || playlist.userProfileUrl }}
        className='w-16 h-16 rounded-lg'
      />
      <View className='flex-1'>
        <Text className='text-white text-lg' numberOfLines={1}>
          {playlist.name}
        </Text>
        <Text className='text-gray-400 text-sm'>
          좋아요: {playlist.likeCount} • 조회수: {playlist.viewCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
