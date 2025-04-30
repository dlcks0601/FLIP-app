import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Playlist } from '@/types/playlist.type';
import { useRouter } from 'expo-router';

interface PlaylistItemProps {
  playlist: Playlist;
}

export default function PlaylistItem({ playlist }: PlaylistItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className='bg-[#282828] rounded-lg overflow-hidden'
      onPress={() => router.push(`/playlist/${playlist.postId}`)}
    >
      <Image
        source={{ uri: playlist.images?.[0].url }}
        className='w-full aspect-square'
      />
      <View className='p-3'>
        <Text className='text-white text-sm font-semibold' numberOfLines={1}>
          {playlist.name}
        </Text>
        <Text className='text-gray-400 text-xs' numberOfLines={1}>
          {playlist.userNickname}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
