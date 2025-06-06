import { View, Text } from 'react-native';
import SpotifyLoginButton from '../components/SpotifyLoginButton';

export default function LoginScreen() {
  const handleSpotifyLogin = () => {};
  return (
    <View className='flex-1 bg-[#121212] px-8'>
      <View className='flex-1 items-center justify-between py-8'>
        <View className='flex-1 items-center justify-center gap-6'>
          <View className='items-center gap-4'>
            <Text className='text-7xl font-logo text-white'>FLIP</Text>
          </View>
        </View>
        <View className='w-full px-4 py-4'>
          <SpotifyLoginButton onPress={handleSpotifyLogin} />
        </View>
      </View>
    </View>
  );
}
