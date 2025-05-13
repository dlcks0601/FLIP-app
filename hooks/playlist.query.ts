import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addPlaylist,
  likePlaylist,
  deletePlaylist,
  fetchComments,
  addComment,
  likeComment,
  deleteComment,
  fetchGenreCategory,
  fetchPlaylists,
  fetchPlaylistGenre,
} from '@/apis/playlist.api';
import { queryClient } from '@/utils/queryClient';
import useAuthStore from '@/store/authStore';
export const usePlaylists = () => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists,
    enabled: isLoggedIn,
  });
};

export const useAddPlaylist = () => {
  return useMutation({
    mutationFn: ({
      playlistUrl,
      explanation,
      genres,
    }: {
      playlistUrl: string;
      explanation: string;
      genres: number[];
    }) => addPlaylist(playlistUrl, explanation, genres),
    onSuccess: () => {
      console.log('playlists 추가');
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
      queryClient.invalidateQueries({ queryKey: ['mypage-playlist'] });
    },
  });
};

export const useLikePlaylist = () => {
  return useMutation<any, Error, string>({
    mutationFn: (postId: string) => likePlaylist(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
      queryClient.invalidateQueries({ queryKey: ['mypage-playlist'] });
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

export const useComments = (postId: string) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: isLoggedIn,
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      addComment(postId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.postId],
      });
    },
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => likeComment(commentId),
    onSuccess: (_, commentId) => {
      queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
    },
  });
};

export const useGenreCategory = () => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['genreCategory'],
    queryFn: () => fetchGenreCategory(),
    enabled: isLoggedIn,
  });
};

export const usePlaylistGenre = (genreId: number) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['playlistGenre', genreId],
    queryFn: () => fetchPlaylistGenre(genreId),
    enabled: isLoggedIn,
  });
};
