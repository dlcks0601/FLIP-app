import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import SpotifyIcon from './SpotifyIcon';

interface SpotifyLoginButtonProps {
  onPress: () => void;
}

export default function SpotifyLoginButton({
  onPress,
}: SpotifyLoginButtonProps) {
  return (
    <TouchableOpacity
      className='flex-row items-center justify-center bg-black px-5 py-3 rounded-full border border-white'
      onPress={onPress}
    >
      <SpotifyIcon />
      <Text className='ml-2 text-base font-bold text-white'>
        Spotify로 계속하기
      </Text>
    </TouchableOpacity>
  );
}
