import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { PlaylistDB } from '@/apis/playlist.api';

interface Top5PlaylistItemProps {
  playlist: PlaylistDB;
}

export default function Top5PlaylistItem({ playlist }: Top5PlaylistItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className='overflow-hidden'
      onPress={() => router.push(`/playlist/${playlist.postId}`)}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: playlist.imageUrl }}
        className='w-full rounded-lg aspect-square'
        resizeMode='cover'
      />
      <View className='py-2'>
        <Text className='text-white font-bold text-base' numberOfLines={1}>
          {playlist.playlistName}
        </Text>
        <Text className='text-gray-300 text-xs ' numberOfLines={1}>
          {playlist.userNickname}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
