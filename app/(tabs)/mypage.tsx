import {
  View,
  Image,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import useAuthStore from '@/store/authStore';
import { useMyPagePlaylistQuery } from '@/hooks/mypage.query';
import MyPlaylistItem from '@/app/components/mypage/MyPlaylistItem';
import { useRouter } from 'expo-router';

export default function MyPageScreen() {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const { data: myPlaylists, isLoading: isLoadingMine } =
    useMyPagePlaylistQuery(true);
  const { data: likedPlaylists, isLoading: isLoadingLiked } =
    useMyPagePlaylistQuery(false);

  if (isLoadingMine || isLoadingLiked) {
    return (
      <View className='flex-1 bg-[#121212] items-center justify-center'>
        <ActivityIndicator color='white' />
      </View>
    );
  }

  return (
    <ScrollView className='flex-1 bg-[#121212]'>
      <View className='flex-row items-center px-2 gap-2 py-4'>
        <Image
          source={{ uri: userInfo.profileUrl }}
          className='w-10 h-10 rounded-full'
        />
        <Text className='text-white text-2xl font-logo'>{userInfo.name}</Text>
      </View>

      <View className='mb-8'>
        <Text className='text-white text-xl font-bold mb-4 px-2'>
          내 플레이리스트
        </Text>
        {!myPlaylists || myPlaylists.length === 0 ? (
          <View className='flex items-center justify-center py-4'>
            <Text className='text-gray-400'>플레이리스트가 없습니다.</Text>
          </View>
        ) : (
          <>
            {myPlaylists.slice(0, 3).map((playlist) => (
              <MyPlaylistItem key={playlist.postId} playlist={playlist} />
            ))}
            {myPlaylists.length > 3 && (
              <TouchableOpacity
                onPress={() => router.push('/playlist/all?type=my')}
                className='mx-32 mt-4 py-3 rounded-full border border-gray-500'
              >
                <Text className='text-white text-center text-sm'>
                  플레이리스트 모두 보기
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      <View>
        <Text className='text-white text-xl font-bold mb-4 px-2'>
          좋아요 한 플레이리스트
        </Text>
        {!likedPlaylists || likedPlaylists.length === 0 ? (
          <View className='flex items-center justify-center py-4'>
            <Text className='text-gray-400'>플레이리스트가 없습니다.</Text>
          </View>
        ) : (
          <>
            {likedPlaylists.slice(0, 3).map((playlist) => (
              <MyPlaylistItem key={playlist.postId} playlist={playlist} />
            ))}
            {likedPlaylists.length > 3 && (
              <TouchableOpacity
                onPress={() => router.push('/playlist/all?type=liked')}
                className='mx-24 mt-4 py-3 rounded-full border border-gray-500'
              >
                <Text className='text-white text-center text-sm'>
                  좋아요 한 플레이리스트 모두 보기
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
