import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MyPlaylistItem from '@/app/components/mypage/MyPlaylistItem';
import { Feather } from '@expo/vector-icons';
import { useAnotherUserPageQuery } from '@/hooks/mypage.query';

export default function UserPlaylistsScreen() {
  const { type, targetUserId } = useLocalSearchParams();
  const router = useRouter();
  const { data: anotherUser } = useAnotherUserPageQuery(targetUserId as string);
  targetUserId as string;

  return (
    <View className='flex-1 bg-[#121212]'>
      <View className='flex-row items-center px-2 py-4'>
        <TouchableOpacity onPress={() => router.back()} className='w-10'>
          <Feather name='chevron-left' size={32} color='white' />
        </TouchableOpacity>
        <View className='flex-1'>
          <Text className='text-white text-xl font-bold text-center'>
            {type === 'my'
              ? `${anotherUser?.user.name} 플레이리스트`
              : `${anotherUser?.user.name} 좋아요한 플레이리스트`}
          </Text>
        </View>
        <View className='w-10' />
      </View>

      <ScrollView>
        {anotherUser?.playlistData?.map((playlist) => (
          <MyPlaylistItem key={playlist.postId} playlist={playlist} />
        ))}
      </ScrollView>
    </View>
  );
}
