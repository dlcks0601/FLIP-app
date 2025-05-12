import {
  fetchAnotherUserAllPlaylistsDetails,
  fetchAnotherUserPage,
  fetchMyAllPlaylistsDetails,
} from '@/apis/mypage.api';
import { useQuery } from '@tanstack/react-query';

export const useMyPagePlaylistQuery = (mine: boolean) => {
  return useQuery({
    queryKey: ['mypage-playlist', mine],
    queryFn: () => fetchMyAllPlaylistsDetails(mine),
  });
};

export const useAnotherUserPageQuery = (targetUserId: string) => {
  return useQuery({
    queryKey: ['anotherUserPage', targetUserId],
    queryFn: () => fetchAnotherUserPage(targetUserId),
  });
};

export const useAnotherUserPlaylistQuery = (targetUserId: string) => {
  return useQuery({
    queryKey: ['anotherUserPlaylist', targetUserId],
    queryFn: () => fetchAnotherUserAllPlaylistsDetails(targetUserId),
  });
};
