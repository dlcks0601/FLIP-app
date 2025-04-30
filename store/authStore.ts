import { AuthAction, AuthState, Jwt, Spotify, User } from '@/types/auth.type';

import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useAuthStore = create(
  combine<AuthState, AuthAction>(
    {
      isLoggedIn: false,
      userInfo: {
        email: '',
        name: '',
        nickname: '',
        profileUrl: '',
        userId: 0,
        authProvider: 'plify',
      },
      spotify: {
        accessToken: '',
        refreshToken: '',
      },
      jwt: {
        accessToken: '',
        refreshToken: '',
      },
    },
    (set) => ({
      login: (user: User, jwt: Jwt, spotify: Spotify) => {
        set({
          isLoggedIn: true,
          userInfo: user,
          jwt: jwt,
          spotify: spotify,
        });
      },
      logout: () => {
        set({
          isLoggedIn: false,
          userInfo: {
            authProvider: 'plify',
            name: '',
            email: '',
            nickname: '',
            profileUrl: '',
            userId: 0,
          },
          jwt: {
            accessToken: '',
            refreshToken: '',
          },
          spotify: {
            accessToken: '',
            refreshToken: '',
          },
        });
      },
    })
  )
);

export default useAuthStore;
