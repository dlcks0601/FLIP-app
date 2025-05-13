import {
  fetchUserTopArtistStats,
  fetchUserTopGenreStats,
  fetchUserTopTrackStats,
  UserTopGenreStats,
} from '@/apis/user.api';
import useAuthStore from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { UserTopTrackStats, UserTopArtistStats } from '@/apis/user.api';

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

export const useUserTopGenreStats = (range: string) => {
  const { spotify } = useAuthStore();

  return useQuery<UserTopGenreStats, Error>({
    queryKey: ['userTopGenres', spotify.accessToken, range],
    queryFn: () => fetchUserTopGenreStats(range),
    enabled: !!spotify.accessToken,
  });
};
