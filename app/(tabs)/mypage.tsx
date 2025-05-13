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
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {
  useMyCurrentlyPlaying,
  useMyRecentlyPlayed,
} from '@/hooks/mypage.query';
import CurrentlyPlaying from '@/app/components/mypage/CurrentlyPlaying';
import RecentlyPlaying from '@/app/components/mypage/RecentlyPlaying';
import { useCountFollowQuery } from '@/hooks/follow.query';

export default function MyPageScreen() {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const { data: myPlaylists, isLoading: isLoadingMine } =
    useMyPagePlaylistQuery(true);
  const { data: likedPlaylists, isLoading: isLoadingLiked } =
    useMyPagePlaylistQuery(false);
  const { data: currentlyPlaying, isLoading: isCurrentlyPlayingLoading } =
    useMyCurrentlyPlaying();
  const { data: recentlyPlayed, isLoading: isRecentlyPlayedLoading } =
    useMyRecentlyPlayed();
  const { data: countFollow } = useCountFollowQuery();

  if (isLoadingMine || isLoadingLiked) {
    return (
      <View className='flex-1 bg-[#121212] items-center justify-center'>
        <ActivityIndicator color='white' />
      </View>
    );
  }

  return (
    <View className='flex-1 bg-[#121212] gap-4'>
      <View className='flex-row items-center px-4'>
        <View className='flex-row flex-1 items-center justify-end'>
          <TouchableOpacity
            onPress={() => router.push('/components/mypage/setting')}
          >
            <Ionicons name='settings-sharp' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className='flex-1'>
        <View className='flex-col items-center gap-4'>
          {/* 계정 정보 */}
          <View className='flex-col items-center gap-4'>
            <Image
              source={{ uri: userInfo?.profileUrl }}
              className='w-40 h-40 rounded-full'
            />
            <Text className='text-white text-xl font-bold'>
              {userInfo?.nickname}
            </Text>
          </View>
          <View className='flex-row items-center gap-20 mb-10'>
            <View className='flex-col items-center'>
              <TouchableOpacity
                onPress={() => router.push('/mypage/followers?type=followers')}
              >
                <Text className='text-white text-center text-xl font-bold'>
                  {countFollow?.data?.followerCount}
                </Text>
                <Text className='text-gray-300 text-md font-light'>팔로워</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/mypage/followers?type=followings')}
            >
              <Text className='text-white text-center text-xl font-bold'>
                {countFollow?.data?.followingCount}
              </Text>
              <Text className='text-gray-300 text-md font-light'>팔로잉</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/playlist/all?type=my')}
            >
              <Text className='text-white text-center text-xl font-bold'>
                {myPlaylists?.playlist.length}
              </Text>
              <Text className='text-gray-300 text-md font-light'> 게시물</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 현재 재생중 or 최근 재생 */}
        <View className='px-4 mb-10'>
          {isCurrentlyPlayingLoading || isRecentlyPlayedLoading ? (
            <ActivityIndicator color='#1DB954' />
          ) : currentlyPlaying?.is_playing && currentlyPlaying.item ? (
            <CurrentlyPlaying item={currentlyPlaying.item} />
          ) : recentlyPlayed?.items?.[0] ? (
            <RecentlyPlaying track={recentlyPlayed.items[0].track} />
          ) : (
            <Text className='text-gray-400'>재생 기록이 없습니다.</Text>
          )}
        </View>
        {/* 내 플레이리스트 */}
        <View className='flex-col gap-4 mb-4'>
          <View className='flex-col'>
            <Text className='text-white text-xl font-bold mb-4 px-4'>
              내 플레이리스트
            </Text>
            {!myPlaylists || myPlaylists.playlist.length === 0 ? (
              <View className='flex items-center justify-center px-4 py-4'>
                <Text className='text-gray-400'>플레이리스트가 없습니다.</Text>
              </View>
            ) : (
              <>
                {myPlaylists?.playlist?.slice(0, 3).map((playlist) => (
                  <MyPlaylistItem key={playlist.postId} playlist={playlist} />
                ))}
                {myPlaylists?.playlist?.length > 3 && (
                  <TouchableOpacity
                    onPress={() => router.push('/playlist/all?type=my')}
                    className='mx-32 mt-4 py-3 rounded-full border border-gray-500 mb-4'
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
            <Text className='text-white text-xl font-bold mb-4 px-4'>
              좋아요 한 플레이리스트
            </Text>
            {!likedPlaylists || likedPlaylists.playlist.length === 0 ? (
              <View className='flex items-center justify-center py-4'>
                <Text className='text-gray-400'>플레이리스트가 없습니다.</Text>
              </View>
            ) : (
              <>
                {likedPlaylists.playlist.slice(0, 3).map((playlist) => (
                  <MyPlaylistItem key={playlist.postId} playlist={playlist} />
                ))}
                {likedPlaylists.playlist.length > 3 && (
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
        </View>
      </ScrollView>
    </View>
  );
}
