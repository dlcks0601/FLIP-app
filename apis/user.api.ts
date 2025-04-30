import { SPOTIFY_API_URL } from '@/constants/config';
import useAuthStore from '@/store/authStore';

export interface Track {
  rank: number;
  image: string;
  title: string;
  artist: string;
}

// top 트랙 리스트 조회
export const fetchTopTracks = async (timeRange: string): Promise<Track[]> => {
  const { spotify } = useAuthStore.getState();

  const response = await fetch(
    `${SPOTIFY_API_URL}/me/top/tracks?time_range=${timeRange}&limit=50`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Spotify API 요청 실패 (Status: ${response.status})`);
  }

  const data = await response.json();
  const tracks: Track[] = data.items.map((track: any, index: number) => ({
    rank: index + 1,
    image: track.album.images[0]?.url,
    title: track.name,
    artist: track.artists.map((artist: any) => artist.name).join(', '),
  }));

  return tracks;
};

export interface Artist {
  rank: number;
  image: string;
  name: string;
}

// top 아티스트 리스트 조회
export const fetchTopArtists = async (timeRange: string): Promise<Artist[]> => {
  const { spotify } = useAuthStore.getState();

  const response = await fetch(
    `${SPOTIFY_API_URL}/me/top/artists?time_range=${timeRange}&limit=50`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Spotify API 요청 실패 (Status: ${response.status})`);
  }

  const data = await response.json();
  const artists: Artist[] = data.items.map((artist: any, index: number) => ({
    rank: index + 1,
    image: artist.images[0]?.url,
    name: artist.name,
  }));

  return artists;
};
