import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import authStore from '@/store/authStore';
import '../global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isAuthRestored, setIsAuthRestored] = useState(false);
  const [initialAuthCheck, setInitialAuthCheck] = useState(false);
  const { jwt, isLoggedIn } = authStore();

  const [fontsLoaded] = useFonts({
    Pretendard: require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Thin': require('../assets/fonts/Pretendard-Thin.otf'),
    'Pretendard-ExtraLight': require('../assets/fonts/Pretendard-ExtraLight.otf'),
    'Pretendard-Light': require('../assets/fonts/Pretendard-Light.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-ExtraBold': require('../assets/fonts/Pretendard-ExtraBold.otf'),
    'Pretendard-Black': require('../assets/fonts/Pretendard-Black.otf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && isAuthRestored) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isAuthRestored]);

  useEffect(() => {
    const restore = async () => {
      await authStore.getState().restoreAuth();
      setIsAuthRestored(true);
    };
    restore();
  }, []);

  useEffect(() => {
    if (!fontsLoaded || !isAuthRestored || initialAuthCheck) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inProtectedRoute = !inAuthGroup;

    if (!isLoggedIn && inProtectedRoute) {
      router.replace('/(auth)/login');
    } else if (isLoggedIn && inAuthGroup) {
      router.replace('/(tabs)');
    }

    setInitialAuthCheck(true);
  }, [isLoggedIn, fontsLoaded, isAuthRestored, segments, initialAuthCheck]);

  if (!fontsLoaded || !isAuthRestored) return null;

  const noSafeAreaSegments = ['[postId]'];
  const isSafeAreaRequired = !segments.some((seg) =>
    noSafeAreaSegments.includes(seg)
  );

  return (
    <QueryClientProvider client={queryClient}>
      {isSafeAreaRequired ? (
        <SafeAreaView
          edges={['top', 'bottom']}
          className='flex-1 bg-[#121212]'
          onLayout={onLayoutRootView}
        >
          <StatusBar style='light' />
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      ) : (
        <View className='flex-1 bg-[#121212]' onLayout={onLayoutRootView}>
          <StatusBar style='light' />
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      )}
    </QueryClientProvider>
  );
}
