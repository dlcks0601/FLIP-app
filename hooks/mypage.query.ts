import { fetchAnotherUserPage, fetchMyPlaylists } from '@/apis/mypage.api';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/authStore';
import {
  CurrentlyPlayingResponse,
  RecentlyPlayedResponse,
  fetchMyCurrentlyPlaying,
  fetchMyRecentlyPlayed,
} from '@/apis/mypage.api';
export const useMyPagePlaylistQuery = (mine: boolean) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['mypage-playlist', mine],
    queryFn: () => fetchMyPlaylists(mine),
    enabled: isLoggedIn,
  });
};

export const useAnotherUserPageQuery = (targetUserId: string) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['anotherUserPage', targetUserId],
    queryFn: () => fetchAnotherUserPage(targetUserId),
    enabled: isLoggedIn,
  });
};

export const useMyCurrentlyPlaying = () => {
  const { spotify } = useAuthStore();
  return useQuery<CurrentlyPlayingResponse | null, Error>({
    queryKey: ['myCurrentlyPlaying', spotify.accessToken],
    queryFn: () => fetchMyCurrentlyPlaying(),
    enabled: !!spotify.accessToken,
    refetchInterval: 200000,
    refetchOnWindowFocus: true,
  });
};

export const useMyRecentlyPlayed = () => {
  const { spotify } = useAuthStore();
  return useQuery<RecentlyPlayedResponse | null, Error>({
    queryKey: ['myRecentlyPlayed', spotify.accessToken],
    queryFn: () => fetchMyRecentlyPlayed(),
    enabled: !!spotify.accessToken,
    refetchOnWindowFocus: true,
  });
};
