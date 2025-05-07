import { SPOTIFY_API_URL } from '@/constants/config';
import useAuthStore from '@/store/authStore';
import { Playlist } from '@/types/playlist.type';
import fetcher from '@/utils/fetcher';

export interface Message {
  code: number;
  text: string;
}

export interface PlaylistDB {
  userId: string;
  userName: string;
  userNickname: string;
  userProfileUrl: string;
  postId: string;
  playlistId: string;
  isLiked: boolean;
  viewCount: number;
  createdAt: string;
  commentCount: number;
  explanation: string;
  genre: string[];
}

export interface PlaylistResponse {
  message: Message;
  playlists: PlaylistDB[];
}

export const fetchPlaylists = async (): Promise<PlaylistResponse> => {
  const response = await fetcher<PlaylistResponse>({
    url: '/playlist',
    method: 'GET',
  });
  console.log(response.data);
  return response.data;
};

export const fetchPlaylistDetail = async (playlistId: string) => {
  const { spotify } = useAuthStore.getState();
  const response = await fetch(`${SPOTIFY_API_URL}/playlists/${playlistId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${spotify.accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export const fetchAllPlaylistsDetails = async (): Promise<Playlist[]> => {
  const storedData = await fetchPlaylists();
  const { playlists } = storedData;
  const enrichedPlaylists = await Promise.all(
    playlists.map(async (playlist: PlaylistDB) => {
      try {
        const spotifyDetail = await fetchPlaylistDetail(playlist.playlistId);
        return {
          ...playlist,
          ...spotifyDetail,
        };
      } catch (error) {
        console.error('Spotify API 호출 중 오류 발생:', error);
        return {
          ...playlist,
          image: null,
          name: 'Unknown Playlist',
          spotifyDetail: null,
        };
      }
    })
  );
  return enrichedPlaylists;
};

export interface AddPlaylistId {
  id: number;
}

export interface AddPlaylistResponse {
  message: Message;
  playlists: AddPlaylistId[];
}

export const addPlaylist = async (
  playlistUrl: string,
  explanation: string,
  genres: number[]
): Promise<AddPlaylistResponse> => {
  const response = await fetcher<AddPlaylistResponse>({
    url: '/playlist',
    method: 'POST',
    data: {
      playlistUrl,
      explanation,
      genres,
    },
  });
  return response.data;
};

export interface LikePlaylistResponse {
  message: Message;
}

export const likePlaylist = async (postId: string) => {
  const response = await fetcher<LikePlaylistResponse>({
    url: `/playlist/${postId}/like`,
    method: 'POST',
  });
  return response.data;
};

export interface DeletePlaylistResponse {
  message: Message;
}

export const deletePlaylist = async (postId: string) => {
  const response = await fetcher<DeletePlaylistResponse>({
    url: `/playlist/${postId}`,
    method: 'DELETE',
  });
  return response.data;
};

export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  userNickname: string;
  userProfileUrl: string;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

export interface CommentResponse {
  explanation: string;
  message: Message;
  comment: Comment[];
  commentCount: number;
}

export interface AddCommentResponse {
  message: Message;
  comment: {
    id: number;
  };
}
export interface AddLikeCommentResponse {
  message: Message;
  liked: boolean;
}

export const fetchComments = async (postId: string) => {
  const response = await fetcher<CommentResponse>({
    url: `/playlist/${postId}`,
    method: 'GET',
  });
  return response.data;
};

export const addComment = async (postId: string, content: string) => {
  const response = await fetcher<AddCommentResponse>({
    url: `/comment/${postId}`,
    method: 'POST',
    data: {
      content,
    },
  });
  return response.data;
};

export const likeComment = async (commentId: string) => {
  const response = await fetcher<AddLikeCommentResponse>({
    url: `/comment/like/${commentId}`,
    method: 'POST',
  });
  return response.data;
};

export const deleteComment = async (commentId: string) => {
  const response = await fetcher<AddLikeCommentResponse>({
    url: `/comment/${commentId}`,
    method: 'DELETE',
  });
  return response.data;
};

export interface GenreCategory {
  id: number;
  name: string;
}

export interface GenreCategoryResponse {
  message: Message;
  genres: GenreCategory[];
}

export const fetchGenreCategory = async () => {
  const response = await fetcher<GenreCategoryResponse>({
    url: `/playlist/genres`,
    method: 'GET',
  });
  return response.data;
};

export interface PlaylistGenreResponse {
  playlists: PlaylistDB[];
  message: Message;
}

export const fetchPlaylistGenre = async (genreId: number) => {
  const response = await fetcher<PlaylistGenreResponse>({
    url: `/playlist/genre`,
    method: 'GET',
    params: {
      genreId,
    },
  });
  return response.data;
};

export const fetchGenrePlaylistsDetails = async (
  genreId: number
): Promise<Playlist[]> => {
  const storedData = await fetchPlaylistGenre(genreId);
  const { playlists } = storedData;
  const enrichedPlaylists = await Promise.all(
    playlists.map(async (playlist: PlaylistDB) => {
      try {
        const spotifyDetail = await fetchPlaylistDetail(playlist.playlistId);
        return {
          ...playlist,
          ...spotifyDetail,
        };
      } catch (error) {
        console.error('Spotify API 호출 중 오류 발생:', error);
        return {
          ...playlist,
          image: null,
          name: 'Unknown Playlist',
          spotifyDetail: null,
        };
      }
    })
  );
  return enrichedPlaylists;
};
