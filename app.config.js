import 'dotenv/config';

export default {
  expo: {
    name: 'flip-app',
    slug: 'flip-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'flip',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#121212',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/FLIP.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#121212',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    fonts: {
      Pretendard: './assets/fonts/Pretendard-Regular.otf',
      'Pretendard-Thin': './assets/fonts/Pretendard-Thin.otf',
      'Pretendard-ExtraLight': './assets/fonts/Pretendard-ExtraLight.otf',
      'Pretendard-Light': './assets/fonts/Pretendard-Light.otf',
      'Pretendard-Medium': './assets/fonts/Pretendard-Medium.otf',
      'Pretendard-SemiBold': './assets/fonts/Pretendard-SemiBold.otf',
      'Pretendard-Bold': './assets/fonts/Pretendard-Bold.otf',
      'Pretendard-ExtraBold': './assets/fonts/Pretendard-ExtraBold.otf',
      'Pretendard-Black': './assets/fonts/Pretendard-Black.otf',
      SpaceMono: './assets/fonts/SpaceMono-Regular.ttf',
    },
    extra: {
      API_URL: process.env.API_URL,
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
      SPOTIFY_SCOPES: process.env.SPOTIFY_SCOPES,
    },
  },
};
