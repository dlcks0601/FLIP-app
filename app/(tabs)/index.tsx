import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import authStore from '@/store/authStore';
import { useMyRecentlyPlayed } from '@/hooks/main.query';

export default function HomeScreen() {
  const { userInfo, isLoggedIn, logout } = authStore();
  const router = useRouter();
  const { data: myRecentlyPlayed } = useMyRecentlyPlayed();
  const handleLogout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: async () => {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
          logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <View className='flex-1 bg-[#121212]'>
      <View className='flex-1 items-center justify-center px-4'>
        <View className='mb-8 items-center'>
          <Text className='mt-2 text-lg text-gray-400'>
            {isLoggedIn ? '로그인됨' : '로그인 안됨'}
          </Text>
          <Text className='mt-2 text-lg text-gray-400'>{userInfo.name}</Text>
          <View>
            <Text className='text-lg text-gray-400'>최근 재생 목록</Text>
            <Text className='text-lg text-gray-400'>
              {myRecentlyPlayed?.items[0]?.track.name}
            </Text>
            <Image
              source={{
                uri: myRecentlyPlayed?.items[0]?.track.album.images[0].url,
              }}
              className='w-10 h-10 rounded-lg'
            />
          </View>

          <TouchableOpacity
            className='mt-8 bg-red-500 px-6 py-3 rounded-lg'
            onPress={handleLogout}
          >
            <Text className='text-white font-bold'>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
