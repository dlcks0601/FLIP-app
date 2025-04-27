import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import SpotifyLoginButton from '../components/SpotifyLoginButton';
import SpotifyIcon from '../components/SpotifyIcon';

export default function HomeScreen() {
  const handleSpotifyLogin = () => {
    // TODO: Spotify 로그인 로직 구현
    console.log('Spotify 로그인 시도');
  };

  return (
    <View className='flex-1 bg-black'>
      <View className='flex-1 items-center justify-center px-4'>
        <View className='mb-8 items-center'>
          <SpotifyIcon />
          <Text className='mt-4 text-4xl font-bold text-white'>PLIFY</Text>
          <Text className='mt-2 text-lg text-gray-400'>
            당신의 음악 여정을 시작하세요
          </Text>
        </View>
        <View className='w-full max-w-xs'>
          <SpotifyLoginButton onPress={handleSpotifyLogin} />
        </View>
      </View>
    </View>
  );
}
