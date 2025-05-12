import { useQuery } from '@tanstack/react-query';
import {
  countFollow,
  deleteFollower,
  fetchFollowers,
  fetchFollowing,
  follow,
} from '@/apis/follow.api';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';

export const useFollowersQuery = () => {
  return useQuery({
    queryKey: ['followers'],
    queryFn: fetchFollowers,
  });
};

export const useFollowingQuery = () => {
  return useQuery({
    queryKey: ['following'],
    queryFn: fetchFollowing,
  });
};

export const useFollowMutation = () => {
  return useMutation({
    mutationFn: (targetUserId: string) => follow(targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['countFollow'] });
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export const useDeleteFollowerMutation = () => {
  return useMutation({
    mutationFn: (targetUserId: string) => deleteFollower(targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['countFollow'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useCountFollowQuery = () => {
  return useQuery({
    queryKey: ['countFollow'],
    queryFn: countFollow,
  });
};
