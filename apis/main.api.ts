import { SPOTIFY_API_URL } from '@/constants/config';
import useAuthStore from '@/store/authStore';

export interface RecentlyPlayedResponse {
  href: string;
  limit: number;
  next: string | null;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
  items: RecentlyPlayedTrack[];
}

export interface RecentlyPlayedTrack {
  track: {
    album: {
      album_type: string;
      total_tracks: number;
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      restrictions?: {
        reason: string;
      };
      type: string;
      uri: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
      ean: string;
      upc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: Record<string, never>;
    restrictions?: {
      reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  };
  played_at: string;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  };
}

export const fetchMyRecentlyPlayed =
  async (): Promise<RecentlyPlayedResponse> => {
    const { spotify } = useAuthStore.getState();

    const response = await fetch(
      `${SPOTIFY_API_URL}/me/player/recently-played?limit=50`,
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
    return data;
  };
