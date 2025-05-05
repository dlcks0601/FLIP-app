import {
  fetchUserTopArtistStats,
  fetchUserTopTrackStats,
} from '@/apis/user.api';
import useAuthStore from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { UserTopTrackStats, UserTopArtistStats } from '@/apis/user.api';

// type TimeRange = 'short_term' | 'medium_term' | 'long_term';

// export const useTopTracks = (timeRange: TimeRange = 'medium_term') => {
//   const { spotify } = useAuthStore();

//   return useQuery<Track[], Error>({
//     queryKey: ['topTracks', spotify.accessToken, timeRange],
//     queryFn: () => fetchTopTracks(timeRange),
//     enabled: !!spotify.accessToken,
//   });
// };

// export const useTopArtists = (timeRange: TimeRange = 'medium_term') => {
//   const { spotify } = useAuthStore();

//   return useQuery<Artist[], Error>({
//     queryKey: ['topArtists', spotify.accessToken, timeRange],
//     queryFn: () => fetchTopArtists(timeRange),
//     enabled: !!spotify.accessToken,
//   });
// };

export const useUserTopTrackStats = (range: string) => {
  const { spotify } = useAuthStore();

  return useQuery<UserTopTrackStats, Error>({
    queryKey: ['userTopTracks', spotify.accessToken, range],
    queryFn: () => fetchUserTopTrackStats(range),
    enabled: !!spotify.accessToken,
  });
};

export const useUserTopArtistStats = (range: string) => {
  const { spotify } = useAuthStore();

  return useQuery<UserTopArtistStats, Error>({
    queryKey: ['userTopArtists', spotify.accessToken, range],
    queryFn: () => fetchUserTopArtistStats(range),
    enabled: !!spotify.accessToken,
  });
};
