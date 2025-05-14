import { SPOTIFY_API_URL } from '@/constants/config';
import useAuthStore from '@/store/authStore';
import fetcher from '@/utils/fetcher';

export interface Message {
  code: number;
  text: string;
}

export interface ArtistData {
  id: number;
  name: string;
  imageUrl: string;
  externalUrl: string;
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

export interface GenreItem {
  userId: number;
  rank: number;
  genre: string;
  artistData: ArtistData[];
}

export interface UserTopTrackStats {
  message: Message;
  rank: TrackItem[];
}

export interface UserTopArtistStats {
  message: Message;
  rank: ArtistItem[];
}

export interface UserTopGenreStats {
  message: Message;
  genres: GenreItem[];
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

  return response.data;
};

export const fetchUserTopGenreStats = async (
  range: string
): Promise<UserTopGenreStats> => {
  const response = await fetcher<UserTopGenreStats>({
    url: '/rank/genre',
    method: 'GET',
    params: {
      range,
    },
  });

  return response.data;
};
