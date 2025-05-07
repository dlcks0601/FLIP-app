import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import authStore from '@/store/authStore';
import { useMyCurrentlyPlaying } from '@/hooks/main.query';

export default function HomeScreen() {
  const { userInfo, isLoggedIn, logout } = authStore();
  const router = useRouter();
  const {
    data: currentlyPlaying,
    isLoading,
    isError,
  } = useMyCurrentlyPlaying();

  const trackName =
    currentlyPlaying?.item?.name ?? '재생 중인 트랙이 없습니다.';
  const albumImageUrl = currentlyPlaying?.item?.album.images?.[0]?.url;

  const handleLogout = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
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
          {/* 로그인 상태 */}
          <Text className='mt-2 text-lg text-gray-400'>
            {isLoggedIn ? '로그인됨' : '로그인 안됨'}
          </Text>
          <Text className='mt-2 text-lg text-gray-400'>{userInfo.name}</Text>

          {/* 현재 재생중 트랙 */}
          <View className='items-center mt-6'>
            <Text className='text-lg text-gray-400 mb-2'>현재 재생 목록</Text>

            {isLoading ? (
              <ActivityIndicator color='#1DB954' />
            ) : isError ? (
              <Text className='text-lg text-gray-400'>
                불러오는 중 오류가 발생했습니다.
              </Text>
            ) : (
              <>
                <Text className='text-lg text-gray-400 mb-2'>{trackName}</Text>
                {albumImageUrl ? (
                  <Image
                    source={{ uri: albumImageUrl }}
                    className='w-10 h-10 rounded-lg'
                  />
                ) : (
                  <View className='w-10 h-10 bg-gray-700 rounded-lg items-center justify-center'>
                    <Text className='text-xs text-gray-400'>이미지 없음</Text>
                  </View>
                )}
              </>
            )}
          </View>

          {/* 로그아웃 버튼 */}
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
