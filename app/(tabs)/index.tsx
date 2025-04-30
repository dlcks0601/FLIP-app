import React from 'react';
import { View, Text } from 'react-native';
import SpotifyLoginButton from '@/app/components/SpotifyLoginButton';
import SpotifyIcon from '@/app/components/SpotifyIcon';
import authStore from '@/store/authStore';

export default function HomeScreen() {
  const { userInfo, isLoggedIn } = authStore();

  return (
    <View className='flex-1 bg-[#121212]'>
      <View className='flex-1 items-center justify-center px-4'>
        <View className='mb-8 items-center'>
          <Text className='mt-2 text-lg text-gray-400'>
            {isLoggedIn ? '로그인됨' : '로그인 안됨'}
          </Text>
          <Text className='mt-2 text-lg text-gray-400'>
            {userInfo.nickname}
          </Text>
        </View>
      </View>
    </View>
  );
}
