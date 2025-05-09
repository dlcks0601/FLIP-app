import { AuthResponse } from '@/types/auth.type';
import fetcher from '@/utils/fetcher';

export const postAuthorizationCode = async (
  authorizationCode: string
): Promise<AuthResponse> => {
  const response = await fetcher<AuthResponse>({
    url: '/auth/spotify/code',
    method: 'POST',
    data: { code: authorizationCode },
  });
  return response.data;
};
