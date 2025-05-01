import {
  Artist,
  fetchTopArtists,
  fetchUserStats,
  fetchUserTopTrackStats,
  Track,
} from '@/apis/user.api';
import useAuthStore from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

// export const useTopTracks = (timeRange: TimeRange = 'medium_term') => {
//   const { spotify } = useAuthStore();

//   return useQuery<Track[], Error>({
//     queryKey: ['topTracks', spotify.accessToken, timeRange],
//     queryFn: () => fetchTopTracks(timeRange),
//     enabled: !!spotify.accessToken,
//   });
// };

export const useTopArtists = (timeRange: TimeRange = 'medium_term') => {
  const { spotify } = useAuthStore();

  return useQuery<Artist[], Error>({
    queryKey: ['topArtists', spotify.accessToken, timeRange],
    queryFn: () => fetchTopArtists(timeRange),
    enabled: !!spotify.accessToken,
  });
};

export const useUserTopTrackStats = (range: string) => {
  const { spotify } = useAuthStore();

  return useQuery<fetchUserStats, Error>({
    queryKey: ['userStats', spotify.accessToken, range],
    queryFn: () => fetchUserTopTrackStats(range),
  });
};
