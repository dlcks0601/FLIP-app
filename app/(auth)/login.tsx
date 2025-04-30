import { View, Text } from 'react-native';
import SpotifyIcon from '../components/SpotifyIcon';
import SpotifyLoginButton from '../components/SpotifyLoginButton';
import Logo from '../components/Logo';

export default function LoginScreen() {
  const handleSpotifyLogin = () => {
    console.log('Spotify 로그인 시도');
  };
  return (
    <View className='flex-1 bg-[#121212] px-8'>
      <View className='flex-1 items-center justify-between py-8'>
        <View className='flex-1 items-center justify-center gap-6'>
          <View className='items-center gap-4'>
            <Logo width={160} height={40} />
            <Text className='text-md text-gray-400'>
              PLIFY는 Spotify를 사용하는 사람들을 위한 공간이에요.
            </Text>
          </View>
          <View className='flew-row items-start gap-4 px-6'>
            <View className='px-[20px] py-[7px] rounded-3xl bg-green-200 '>
              <Text className='text-md font-normal text-green-800'>
                가장 많이 들은 곡을 알고싶어요.
              </Text>
            </View>
            <View className='px-[20px] py-[7px] rounded-3xl bg-yellow-200 '>
              <Text className='text-md font-normal text-yellow-800'>
                가장 많이 들은 가수를 알고싶어요.
              </Text>
            </View>
            <View className='px-[20px] py-[7px] rounded-3xl bg-blue-200 '>
              <Text className='text-md font-normal text-blue-800'>
                플레이리스트를 공유하고 싶어요.
              </Text>
            </View>
          </View>
        </View>
        <View className='w-full'>
          <SpotifyLoginButton onPress={handleSpotifyLogin} />
        </View>
      </View>
    </View>
  );
}
