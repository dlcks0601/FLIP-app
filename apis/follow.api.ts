import fetcher from '@/utils/fetcher';
import { Message } from './playlist.api';

export interface FollowResponse {
  message: Message;
}

export const follow = async (targetUserId: string) => {
  const response = await fetcher<FollowResponse>({
    url: `/follow/${targetUserId}`,
    method: 'POST',
  });
  return response.data;
};

export interface Follower {
  id: string;
  name: string;
  profileUrl: string;
}

export interface fetchFollowersResponse {
  message: Message;
  follower: Follower[];
}

export interface Following {
  id: string;
  name: string;
  profileUrl: string;
}

export interface fetchFollowingResponse {
  message: Message;
  following: Following[];
}

export const fetchFollowers = async () => {
  const response = await fetcher<fetchFollowersResponse>({
    url: `/follow/follower`,
    method: 'GET',
  });
  console.log(response.data);
  return response.data;
};

export const fetchFollowing = async () => {
  const response = await fetcher<fetchFollowingResponse>({
    url: `/follow/following`,
    method: 'GET',
  });
  console.log(response.data);
  return response.data;
};
