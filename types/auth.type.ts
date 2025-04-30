export type AuthProvider = 'spotify' | 'plify';

export interface User {
  authProvider?: AuthProvider;
  email: string;
  name: string;
  nickname: string;
  profileUrl: string;
  userId: number;
}

export interface Message {
  code: number;
  text: string;
}

export interface Jwt {
  accessToken: string;
  refreshToken: string;
}

export interface Spotify {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  message: Message;
  jwt: Jwt;
  spotify: Spotify;
  user: User;
}

// zustand 타입

export interface AuthState {
  isLoggedIn: boolean;
  userInfo: User;
  spotify: Spotify;
  jwt: Jwt;
}

export interface AuthAction {
  login: (user: User, jwt: Jwt, spotify: Spotify) => void;
  logout: () => void;
}
