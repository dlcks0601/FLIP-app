import { View, Text, ActivityIndicator } from 'react-native';
import { useTopArtists, useTopTracks } from '@/hooks/user.query';
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
  const { isLoggedIn } = useAuthStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('medium_term');
  const [contentType, setContentType] = useState<ContentType>('tracks');
  const { data: tracks, isLoading, error } = useTopTracks(timeRange);
  const {
    data: artists,
    isLoading: artistsLoading,
    error: artistsError,
  } = useTopArtists(timeRange);
  if (!isLoggedIn) {
    return (
      <View className='flex-1 items-center justify-center bg-[#121212]'>
        <Text className='text-white'>로그인이 필요합니다.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center bg-[#121212]'>
        <ActivityIndicator size='large' color='#1DB954' />
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex-1 items-center justify-center bg-[#121212]'>
        <Text className='text-white'>에러가 발생했습니다: {error.message}</Text>
      </View>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <View className='flex-1 items-center justify-center bg-[#121212]'>
        <Text className='text-white'>재생 기록이 없습니다.</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-[#121212]'>
      {/* 헤더 */}
      <View className='items-center'>
        <Text className='text-white text-2xl font-bold'>순위표</Text>
      </View>

      {/* 시간 탭 메뉴 */}
      <TimeRangeTabs timeRange={timeRange} onTimeRangeChange={setTimeRange} />

      {/* 컨텐츠 리스트 */}
      {contentType === 'tracks' ? (
        <TrackList tracks={tracks} />
      ) : (
        <ArtistList artists={artists} />
      )}

      {/* 컨텐츠 타입 탭 메뉴 */}
      <ContentTypeTabs
        contentType={contentType}
        onContentTypeChange={setContentType}
      />
    </View>
  );
}
