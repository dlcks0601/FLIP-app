import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useFollowersQuery, useFollowingQuery } from '@/hooks/follow.query';
import { Follower, Following } from '@/apis/follow.api';

export default function FollowersScreen() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const { data: followersData } = useFollowersQuery();
  const { data: followingData } = useFollowingQuery();

  const users =
    type === 'followers' ? followersData?.follower : followingData?.following;

  return (
    <View className='flex-1 bg-[#121212]'>
      <View className='flex-row items-center px-2 py-4'>
        <TouchableOpacity onPress={() => router.back()} className='w-10'>
          <Feather name='chevron-left' size={32} color='white' />
        </TouchableOpacity>
        <View className='flex-1'>
          <Text className='text-white text-xl font-bold text-center'>
            {type === 'followers' ? '팔로워' : '팔로잉'}
          </Text>
        </View>
        <View className='w-10' />
      </View>

      <ScrollView>
        {users?.map((user: Follower | Following) => (
          <View
            key={user.id}
            className='flex-row items-center px-4 py-3 border-b border-gray-800'
          >
            <Image
              source={{ uri: user.profileUrl }}
              className='w-12 h-12 rounded-full'
            />
            <View className='ml-4 flex-1'>
              <Text className='text-white text-lg font-bold'>{user.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
