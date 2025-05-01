import { View, Image, Text, ActivityIndicator } from 'react-native';
import {
  useTopArtists,
  useTopTracks,
  useUserTopTrackStats,
} from '@/hooks/user.query';
import useAuthStore from '@/store/authStore';
import { useState } from 'react';
import TimeRangeTabs, {
  TimeRange,
} from '@/app/components/mypage/TimeRangeTabs';
import ContentTypeTabs, {
  ContentType,
} from '@/app/components/mypage/ContentTypeTabs';
import TrackList from '@/app/components/mypage/TrackList';
import ArtistList from '../components/mypage/ArtistList';

export default function MyPageScreen() {
  const { isLoggedIn, userInfo } = useAuthStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('medium_term');
  const [contentType, setContentType] = useState<ContentType>('tracks');
  // const { data: tracks, isLoading: tracksLoading } = useTopTracks(timeRange);
  const { data: artists, isLoading: artistsLoading } = useTopArtists(timeRange);
  const { data: userTopTrackStats, isLoading: userTopTrackStatsLoading } =
    useUserTopTrackStats(timeRange.replace('_term', ''));

  if (!isLoggedIn) {
    return (
      <View className='flex-1 items-center justify-center bg-[#121212]'>
        <Text className='text-white'>로그인이 필요합니다.</Text>
      </View>
    );
  }

  if (userTopTrackStatsLoading || artistsLoading) {
    return (
      <View className='flex-1 items-center justify-center bg-[#121212]'>
        <ActivityIndicator size='large' color='#1DB954' />
      </View>
    );
  }

  const renderContent = () => {
    if (contentType === 'tracks') {
      if (!userTopTrackStats || userTopTrackStats.rank.length === 0) {
        return (
          <View className='flex-1 items-center justify-center'>
            <Text className='text-white text-lg'>
              {timeRange === 'long_term'
                ? '일년 동안의 재생 기록이 없습니다.'
                : timeRange === 'medium_term'
                ? '6개월 동안의 재생 기록이 없습니다.'
                : '한 달 동안의 재생 기록이 없습니다.'}
            </Text>
          </View>
        );
      }
      return <TrackList tracks={userTopTrackStats.rank} />;
    } else {
      if (!artists || artists.length === 0) {
        return (
          <View className='flex-1 items-center justify-center'>
            <Text className='text-white text-lg'>
              {timeRange === 'long_term'
                ? '일년 동안의 아티스트 기록이 없습니다.'
                : timeRange === 'medium_term'
                ? '6개월 동안의 아티스트 기록이 없습니다.'
                : '한 달 동안의 아티스트 기록이 없습니다.'}
            </Text>
          </View>
        );
      }
      return <ArtistList artists={artists} />;
    }
  };

  return (
    <View className='flex-1 bg-[#121212]'>
      {/* 헤더 */}
      <View className='flex-row items-center px-4 gap-2'>
        <Image
          source={{ uri: userInfo.profileUrl }}
          className='w-10 h-10 rounded-full'
        />
        <Text className='text-white text-2xl font-bold'>{userInfo.name}</Text>
      </View>

      {/* 시간 탭 메뉴 */}
      <TimeRangeTabs timeRange={timeRange} onTimeRangeChange={setTimeRange} />

      {/* 컨텐츠 리스트 */}
      {renderContent()}

      {/* 컨텐츠 타입 탭 메뉴 */}
      <ContentTypeTabs
        contentType={contentType}
        onContentTypeChange={setContentType}
      />
    </View>
  );
}
