import { SPOTIFY_API_URL } from '@/constants/config';
import useAuthStore from '@/store/authStore';
import fetcher from '@/utils/fetcher';

export interface Track {
  rank: number;
  image: string;
  title: string;
  artist: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  rank: number;
  externalUrl: string;
  genres: string[];
  followers: number;
  popularity: number;
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

export interface Message {
  code: number;
  text: string;
}

export interface TrackItem {
  id: number;
  userId: string;
  rank: number;
  trackId: string;
  name: string;
  imageUrl: string;
  artistId: string;
  artistName: string;
  externalUrl: string;
  snapshotAt: string;
  timeRange: string;
  diff: number;
}

export interface ArtistItem {
  artistId: string;
  name: string;
  imageUrl: string;
  rank: number;
  externalUrl: string;
  diff: number;
}

export interface UserTopTrackStats {
  message: Message;
  rank: TrackItem[];
}

export interface UserTopArtistStats {
  message: Message;
  rank: ArtistItem[];
}

export const fetchUserTopTrackStats = async (
  range: string
): Promise<UserTopTrackStats> => {
  const { spotify } = useAuthStore.getState();
  const response = await fetcher<UserTopTrackStats>({
    url: '/rank/track',
    method: 'POST',
    data: {
      code: spotify.accessToken,
      range,
    },
  });
  console.log('Track Stats Response:', response.data);
  return response.data;
};

export const fetchUserTopArtistStats = async (
  range: string
): Promise<UserTopArtistStats> => {
  const { spotify } = useAuthStore.getState();
  const response = await fetcher<UserTopArtistStats>({
    url: '/rank/artist',
    method: 'POST',
    data: {
      code: spotify.accessToken,
      range,
    },
  });
  console.log('Artist Stats Response:', response.data);
  return response.data;
};
