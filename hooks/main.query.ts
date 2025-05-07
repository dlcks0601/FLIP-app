import {
  fetchMyCurrentlyPlaying,
  CurrentlyPlayingResponse,
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
