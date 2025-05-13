import fetcher from '@/utils/fetcher';
import { PlaylistDB } from './playlist.api';

export interface Top5TracksResponse {
  message: {
    code: number;
    text: string;
  };
  playlist: PlaylistDB[];
}

export const fetchTop5Tracks = async () => {
  const response = await fetcher<Top5TracksResponse>({
    url: '/home/playlist',
    method: 'GET',
  });
  return response.data;
};
