import { deleteUser, postAuthorizationCode } from '@/apis/auth.api';
import { useMutation } from '@tanstack/react-query';
import { router, useRouter } from 'expo-router';
import useAuthStore from '@/store/authStore';
import { AuthResponse } from '@/types/auth.type';

export const useAuthMutation = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: (code: string) => postAuthorizationCode(code),
    onSuccess: async (data: AuthResponse) => {
      const { jwt, spotify, user } = data;
      await login(user, jwt, spotify);

      router.replace('/(tabs)');
    },
    onError: (error) => {
      console.error('Authorization Code 전송 중 오류:', error);
    },
  });

  return { login: mutate };
};

export const useDeleteUserMutation = () => {
  const { mutate } = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      useAuthStore.getState().logout();
      router.replace('/(auth)/login');
    },
  });
  return { deleteUser: mutate };
};
