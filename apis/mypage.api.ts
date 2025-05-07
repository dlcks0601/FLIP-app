import fetcher from '@/utils/fetcher';
import { Message, PlaylistDB } from './playlist.api';
import useAuthStore from '@/store/authStore';
import { SPOTIFY_API_URL } from '@/constants/config';
import { Playlist } from '@/types/playlist.type';

export interface MypagePlaylistResponse {
  playlist: PlaylistDB[];
  message: Message;
}

export const fetchMyPlaylists = async (
  mine: boolean
): Promise<MypagePlaylistResponse> => {
  const response = await fetcher<MypagePlaylistResponse>({
    url: `/mypage/playlist?mine=${mine}`,
    method: 'GET',
  });
  console.log(response.data);
  return response.data;
};

export const fetchMyPlaylistDetail = async (playlistId: string) => {
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

export const fetchMyAllPlaylistsDetails = async (
  mine: boolean
): Promise<Playlist[]> => {
  const storedData = await fetchMyPlaylists(mine);
  const { playlist } = storedData;
  const enrichedPlaylist = await Promise.all(
    playlist.map(async (playlist: PlaylistDB) => {
      try {
        const spotifyDetail = await fetchMyPlaylistDetail(playlist.playlistId);
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
  return enrichedPlaylist;
};
