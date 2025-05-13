import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from '@/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useDeleteUserMutation } from '@/hooks/auth.query';

export default function SettingPage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { deleteUser } = useDeleteUserMutation();

  return (
    <ScrollView className='flex-1 bg-[#121212]'>
      <View className='px-4 py-6'>
        <View className='flex-row items-center mb-6'>
          <TouchableOpacity onPress={() => router.back()} className='mr-4'>
            <Ionicons name='chevron-back' size={24} color='white' />
          </TouchableOpacity>
          <Text className='text-white text-2xl font-bold'>설정</Text>
        </View>

        <View className='space-y-4'>
          <TouchableOpacity
            className='bg-[#1E1E1E] p-4 rounded-lg'
            onPress={() => {}}
          >
            <Text className='text-white text-lg'>알림 설정</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='bg-[#1E1E1E] p-4 rounded-lg'
            onPress={() => {}}
          >
            <Text className='text-white text-lg'>개인정보 설정</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='bg-[#1E1E1E] p-4 rounded-lg'
            onPress={() => {}}
          >
            <Text className='text-white text-lg'>앱 정보</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='bg-red-500 p-4 rounded-lg mt-8'
            onPress={() => {
              logout();
              router.replace('/login');
            }}
          >
            <Text className='text-white text-lg text-center'>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='bg-red-800 p-4 rounded-lg mt-8'
            onPress={() => {
              // 회원 탈퇴 확인 알림
              Alert.alert(
                '회원 탈퇴',
                '정말로 회원 탈퇴를 진행하시겠습니까?\n이 작업은 되돌릴 수 없습니다.',
                [
                  { text: '취소', style: 'cancel' },
                  {
                    text: '탈퇴',
                    style: 'destructive',
                    onPress: () => deleteUser(),
                  },
                ]
              );
            }}
          >
            <Text className='text-white text-lg text-center'>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
