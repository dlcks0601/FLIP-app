import { useQuery } from '@tanstack/react-query';
import { fetchFollowers, fetchFollowing, follow } from '@/apis/follow.api';
import { useMutation } from '@tanstack/react-query';

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
  });
};
