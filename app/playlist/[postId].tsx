import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { usePlaylists } from '@/hooks/playlist.query';

export default function PlaylistDetailScreen() {
  const router = useRouter();
  const { data: playlistData } = usePlaylists();
  const { postId } = useLocalSearchParams();
  const numericPostId = Number(postId);
  const playlist = playlistData?.find((p) => p.postId === numericPostId);
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
      </View>

      <View className='p-4'>
        <Text className='text-white text-2xl font-bold'>{playlist?.name}</Text>
        <Text className='text-gray-400 mt-1'>플레이리스트</Text>
      </View>
    </View>
  );
}
