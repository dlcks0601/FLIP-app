import { AuthAction, AuthState, Jwt, Spotify, User } from '@/types/auth.type';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const STORAGE_KEY = 'plify-auth';

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
      login: async (user, jwt, spotify) => {
        const authData = { jwt, spotify, user };
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(authData));

        set({
          isLoggedIn: true,
          userInfo: user,
          jwt,
          spotify,
        });
      },
      logout: async () => {
        await SecureStore.deleteItemAsync(STORAGE_KEY);
        set({
          isLoggedIn: false,
          userInfo: {
            email: '',
            name: '',
            nickname: '',
            profileUrl: '',
            userId: 0,
            authProvider: 'plify',
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
      setJwt: (jwt) => set({ jwt }),
      setSpotify: (spotify) => set({ spotify }),
      setUser: (user) => set({ userInfo: user }),
      restoreAuth: async () => {
        const data = await SecureStore.getItemAsync(STORAGE_KEY);
        if (!data) return;

        const parsed = JSON.parse(data);
        set({
          isLoggedIn: true,
          userInfo: parsed.user,
          jwt: parsed.jwt,
          spotify: parsed.spotify,
        });
      },
    })
  )
);

export default useAuthStore;
