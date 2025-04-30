import Constants from 'expo-constants';

export const API_URL = Constants.expoConfig?.extra?.API_URL || '';
export const SPOTIFY_CLIENT_ID =
  Constants.expoConfig?.extra?.SPOTIFY_CLIENT_ID || '';
export const SPOTIFY_REDIRECT_URI =
  Constants.expoConfig?.extra?.SPOTIFY_REDIRECT_URI || '';
export const SPOTIFY_SCOPES = Constants.expoConfig?.extra?.SPOTIFY_SCOPES || '';

export const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
