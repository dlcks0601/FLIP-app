import { fetchMyRecentlyPlayed, RecentlyPlayedResponse } from '@/apis/main.api';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/authStore';

export const useMyRecentlyPlayed = () => {
  const { spotify } = useAuthStore();

  return useQuery<RecentlyPlayedResponse, Error>({
    queryKey: ['myRecentlyPlayed', spotify.accessToken],
    queryFn: fetchMyRecentlyPlayed,
  });
};
