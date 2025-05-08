import {
  fetchMyCurrentlyPlaying,
  CurrentlyPlayingResponse,
  RecentlyPlayedResponse,
  fetchMyRecentlyPlayed,
} from '@/apis/main.api';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/authStore';

export const useMyCurrentlyPlaying = () => {
  const { spotify } = useAuthStore();
  return useQuery<CurrentlyPlayingResponse | null, Error>({
    queryKey: ['myCurrentlyPlaying', spotify.accessToken],
    queryFn: () => fetchMyCurrentlyPlaying(),
    enabled: !!spotify.accessToken,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });
};

export const useMyRecentlyPlayed = () => {
  const { spotify } = useAuthStore();
  return useQuery<RecentlyPlayedResponse | null, Error>({
    queryKey: ['myRecentlyPlayed', spotify.accessToken],
    queryFn: () => fetchMyRecentlyPlayed(),
    enabled: !!spotify.accessToken,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });
};
