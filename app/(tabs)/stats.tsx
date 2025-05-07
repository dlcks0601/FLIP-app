import { View, Image, Text, ActivityIndicator } from 'react-native';
import {
  useUserTopArtistStats,
  useUserTopTrackStats,
  useUserTopGenreStats,
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
import GenreList from '../components/mypage/GenreList';

export default function StatsScreen() {
  const { isLoggedIn, userInfo } = useAuthStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('medium_term');
  const [contentType, setContentType] = useState<ContentType>('tracks');
  const { data: userTopArtistStats, isLoading: userTopArtistStatsLoading } =
    useUserTopArtistStats(timeRange.replace('_term', ''));
  const { data: userTopTrackStats, isLoading: userTopTrackStatsLoading } =
    useUserTopTrackStats(timeRange.replace('_term', ''));
  const { data: userTopGenreStats, isLoading: userTopGenreStatsLoading } =
    useUserTopGenreStats(timeRange.replace('_term', ''));

  if (
    userTopTrackStatsLoading ||
    userTopArtistStatsLoading ||
    userTopGenreStatsLoading
  ) {
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
    } else if (contentType === 'artists') {
      if (!userTopArtistStats || userTopArtistStats.rank.length === 0) {
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
      return <ArtistList artists={userTopArtistStats.rank} />;
    } else {
      return <GenreList timeRange={timeRange.replace('_term', '')} />;
    }
  };

  return (
    <View className='flex-1 bg-[#121212]'>
      {/* 헤더 */}
      <View className='flex-row items-center px-4 gap-2'>
        <Text className='text-white text-xl font-black'>STATS</Text>
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
