import fetcher from '@/utils/fetcher';
import { Message, PlaylistDB } from './playlist.api';

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

  return response.data;
};

export interface AnotherUser {
  id: number;
  name: string;
  profileUrl: string;
}

export interface AnotherUserPageResponse {
  message: Message;
  user: AnotherUser;
  playlistData: PlaylistDB[];
  followerCount: number;
  followingCount: number;
  playlistCount: number;
}

export const fetchAnotherUserPage = async (targetUserId: string) => {
  const response = await fetcher<AnotherUserPageResponse>({
    url: `/mypage/user/${targetUserId}`,
    method: 'GET',
  });
  return response.data;
};

import { SPOTIFY_API_URL } from '@/constants/config';
import useAuthStore from '@/store/authStore';

export interface ExternalUrls {
  spotify: string;
}

export interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
}

export interface Context {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface AlbumImage {
  url: string;
  height: number;
  width: number;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: { reason: string };
  type: string;
  uri: string;
  artists: Artist[];
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: Record<string, never>;
  restrictions?: { reason: string };
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Actions {
  interrupting_playback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_shuffle: boolean;
  toggling_repeat_track: boolean;
  transferring_playback: boolean;
}

export interface CurrentlyPlayingResponse {
  device: Device;
  repeat_state: string;
  shuffle_state: boolean;
  context: Context | null;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Track | null;
  currently_playing_type: string;
  actions: Actions;
}

export const fetchMyCurrentlyPlaying =
  async (): Promise<CurrentlyPlayingResponse> => {
    const { spotify } = useAuthStore.getState();

    const response = await fetch(
      `${SPOTIFY_API_URL}/me/player/currently-playing`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${spotify.accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data;
  };

export interface RecentlyPlayedResponse {
  href: string;
  limit: number;
  next: string;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
  items: {
    track: Track;
    played_at: string;
    context: Context;
  }[];
}

export const fetchMyRecentlyPlayed =
  async (): Promise<RecentlyPlayedResponse> => {
    const { spotify } = useAuthStore.getState();

    const response = await fetch(
      `${SPOTIFY_API_URL}/me/player/recently-played`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${spotify.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  };
