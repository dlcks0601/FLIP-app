import { SPOTIFY_API_URL } from '@/constants/config';
import useAuthStore from '@/store/authStore';
import fetcher from '@/utils/fetcher';

export interface Track {
  rank: number;
  image: string;
  title: string;
  artist: string;
}

// top 트랙 리스트 조회
// export const fetchTopTracks = async (timeRange: string): Promise<Track[]> => {
//   const { spotify } = useAuthStore.getState();

//   const response = await fetch(
//     `${SPOTIFY_API_URL}/me/top/tracks?time_range=${timeRange}&limit=50`,
//     {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${spotify.accessToken}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Spotify API 요청 실패 (Status: ${response.status})`);
//   }

//   const data = await response.json();
//   const tracks: Track[] = data.items.map((track: any, index: number) => ({
//     rank: index + 1,
//     image: track.album.images[0]?.url,
//     title: track.name,
//     artist: track.artists.map((artist: any) => artist.name).join(', '),
//   }));

//   return tracks;
// };

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

export interface Item {
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

export interface fetchUserStats {
  message: Message;
  rank: Item[];
}

export const fetchUserTopTrackStats = async (
  range: string
): Promise<fetchUserStats> => {
  const { spotify } = useAuthStore.getState();
  const response = await fetcher<fetchUserStats>({
    url: '/rank/track',
    method: 'POST',
    data: {
      code: spotify.accessToken,
      range,
    },
  });
  return response.data;
};
