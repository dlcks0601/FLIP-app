import { fetchMyAllPlaylistsDetails } from '@/apis/mypage.api';
import { useQuery } from '@tanstack/react-query';

export const useMyPagePlaylistQuery = (mine: boolean) => {
  return useQuery({
    queryKey: ['mypage-playlist', mine],
    queryFn: () => fetchMyAllPlaylistsDetails(mine),
  });
};
