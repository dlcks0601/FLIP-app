import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import SpotifyIcon from './SpotifyIcon';
import { useAuthMutation } from '@/hooks/auth.query';
import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_SCOPES,
} from '@/constants/config';

interface SpotifyLoginButtonProps {
  onPress?: () => void;
}

export default function SpotifyLoginButton({
  onPress,
}: SpotifyLoginButtonProps) {
  const { login } = useAuthMutation();

  const handlePress = async () => {
    const authUrl =
      `${SPOTIFY_AUTH_URL}?client_id=${SPOTIFY_CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(SPOTIFY_SCOPES)}` +
      `&show_dialog=true`;

    try {
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        SPOTIFY_REDIRECT_URI
      );
      if (result.type === 'success' && result.url) {
        const code = extractCode(result.url);
        if (code) {
          login(code);
        } else {
          Alert.alert(
            '로그인 실패',
            'Authorization code를 가져오지 못했습니다.'
          );
        }
      }
    } catch (error) {
      console.error('Spotify 로그인 에러:', error);
      Alert.alert('로그인 실패', '문제가 발생했습니다. 다시 시도해주세요.');
    }

    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      className='flex-row items-center justify-center bg-[#1ED760] py-4 rounded-xl gap-2'
      onPress={handlePress}
    >
      <SpotifyIcon />
      <Text className='text-xl font-semibold text-black'>
        Spotify로 계속하기
      </Text>
    </TouchableOpacity>
  );
}

function extractCode(url: string): string | null {
  const matched = url.match(/[?&]code=([^&]+)/);
  return matched ? matched[1] : null;
}
