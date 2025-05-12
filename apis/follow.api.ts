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
  isFollowed: boolean;
}

export interface fetchFollowersResponse {
  message: Message;
  follower: Follower[];
}

export interface Following {
  id: string;
  name: string;
  profileUrl: string;
  isFollowed: boolean;
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
  // console.log(response.data);
  return response.data;
};

export const fetchFollowing = async () => {
  const response = await fetcher<fetchFollowingResponse>({
    url: `/follow/following`,
    method: 'GET',
  });
  // console.log(response.data);
  return response.data;
};

export const deleteFollower = async (targetUserId: string) => {
  const response = await fetcher<FollowResponse>({
    url: `/follow/${targetUserId}`,
    method: 'DELETE',
  });
  console.log(response.data);
  return response.data;
};

export interface CountFollowResponse {
  message: Message;
  data: {
    followerCount: number;
    followingCount: number;
  };
}

export const countFollow = async () => {
  const response = await fetcher<CountFollowResponse>({
    url: `/follow/count`,
    method: 'GET',
  });
  return response.data;
};
