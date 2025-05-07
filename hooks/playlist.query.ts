import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAllPlaylistsDetails,
  addPlaylist,
  likePlaylist,
  deletePlaylist,
  fetchComments,
  addComment,
  likeComment,
  deleteComment,
  fetchGenreCategory,
  fetchGenrePlaylistsDetails,
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

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
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
  return useQuery({
    queryKey: ['genreCategory'],
    queryFn: () => fetchGenreCategory(),
  });
};

export const usePlaylistGenre = (genreId: number) => {
  return useQuery({
    queryKey: ['playlistGenre', genreId],
    queryFn: () => fetchGenrePlaylistsDetails(genreId),
  });
};
