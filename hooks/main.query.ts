import { useQuery } from '@tanstack/react-query';
import { fetchTop5Tracks, Top5TracksResponse } from '@/apis/main.api';
import useAuthStore from '@/store/authStore';
export const useTop5Tracks = () => {
  const { isLoggedIn } = useAuthStore();
  return useQuery<Top5TracksResponse, Error>({
    queryKey: ['top5tracks'],
    queryFn: () => fetchTop5Tracks(),
    enabled: isLoggedIn,
  });
};
