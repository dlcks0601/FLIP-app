import { View, Image, Text, ActivityIndicator } from 'react-native';
import useAuthStore from '@/store/authStore';

export default function MyPageScreen() {
  const { userInfo } = useAuthStore();
  return (
    <View className='flex-1 bg-[#121212]'>
      <View className='flex-row items-center px-4 gap-2'>
        <Image
          source={{ uri: userInfo.profileUrl }}
          className='w-10 h-10 rounded-full'
        />
        <Text className='text-white text-2xl font-bold'>{userInfo.name}</Text>
      </View>
    </View>
  );
}
