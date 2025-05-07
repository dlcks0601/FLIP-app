import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMyPagePlaylistQuery } from '@/hooks/mypage.query';
import MyPlaylistItem from '@/app/components/mypage/MyPlaylistItem';
import { AntDesign } from '@expo/vector-icons';

export default function AllPlaylistsScreen() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const { data: playlists } = useMyPagePlaylistQuery(type === 'my');

  return (
    <View className='flex-1 bg-[#121212]'>
      <View className='flex-row items-center px-2 py-4 gap-2'>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name='left' size={24} color='white' />
        </TouchableOpacity>
        <Text className='text-white text-xl font-bold'>
          {type === 'my' ? '내 플레이리스트' : '좋아요한 플레이리스트'}
        </Text>
      </View>

      <ScrollView>
        {playlists?.map((playlist) => (
          <MyPlaylistItem key={playlist.postId} playlist={playlist} />
        ))}
      </ScrollView>
    </View>
  );
}
