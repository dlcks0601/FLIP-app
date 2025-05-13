import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PlaylistDB } from '@/apis/playlist.api';

interface MyPlaylistItemProps {
  playlist: PlaylistDB;
}

export default function MyPlaylistItem({ playlist }: MyPlaylistItemProps) {
  const router = useRouter();

  return (
    <View className='flex-row items-center mb-2'>
      <TouchableOpacity
        onPress={() => router.push(`/playlist/${playlist.postId}`)}
        className='flex-row items-center gap-3 p-2 px-4'
      >
        <Image source={{ uri: playlist.imageUrl }} className='w-16 h-16' />
        <View className='flex-1'>
          <Text className='text-white text-lg' numberOfLines={1}>
            {playlist.playlistName}
          </Text>
          <Text className='text-gray-400 text-sm'>
            좋아요: {playlist.likeCount} • 조회수: {playlist.viewCount}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
