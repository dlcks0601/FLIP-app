import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchAllPlaylistsDetails,
  addPlaylist,
  likePlaylist,
  deletePlaylist,
} from '@/apis/playlist.api';
import { queryClient } from '@/utils/queryClient';

export const usePlaylists = () => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: fetchAllPlaylistsDetails,
  });
};

export const useAddPlaylist = () => {
  return useMutation({
    mutationFn: addPlaylist,
    onSuccess: () => {
      console.log('playlists 추가');
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
};

export const useLikePlaylist = () => {
  return useMutation<any, Error, string>({
    mutationFn: (postId: string) => likePlaylist(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
};

export const useDeletePlaylist = () => {
  return useMutation<any, Error, string>({
    mutationFn: (postId: string) => deletePlaylist(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
  });
};
