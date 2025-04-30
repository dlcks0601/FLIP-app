import { SPOTIFY_API_URL } from '@/constants/config';
import useAuthStore from '@/store/authStore';
import { Playlist } from '@/types/playlist.type';
import fetcher from '@/utils/fetcher';

export interface Message {
  code: number;
  message: string;
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
  playlistUrl: string
): Promise<AddPlaylistResponse> => {
  const response = await fetcher<AddPlaylistResponse>({
    url: '/playlist',
    method: 'POST',
    data: {
      playlistUrl,
    },
  });
  return response.data;
};
