import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  useFollowersQuery,
  useFollowingQuery,
  useFollowMutation,
  useDeleteFollowerMutation,
} from '@/hooks/follow.query';
import { Follower, Following } from '@/apis/follow.api';

export default function FollowersScreen() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const { data: followersData } = useFollowersQuery();
  const { data: followingData } = useFollowingQuery();
  const followMutation = useFollowMutation();
  const deleteFollowerMutation = useDeleteFollowerMutation();

  const users =
    type === 'followers' ? followersData?.follower : followingData?.following;

  const handleFollow = (
    userId: string,
    userName: string,
    isFollowed: boolean
  ) => {
    Alert.alert(
      isFollowed ? '팔로우 취소' : '팔로우',
      isFollowed
        ? `${userName}님을 팔로우 취소하시겠습니까?`
        : `${userName}님을 팔로우 하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: isFollowed ? '팔로우 취소' : '팔로우',
          onPress: () => {
            followMutation.mutate(userId, {
              onSuccess: () => {
                Alert.alert(
                  '알림',
                  isFollowed ? '팔로우가 취소되었습니다.' : '팔로우 되었습니다.'
                );
              },
              onError: () => {
                Alert.alert('오류', '처리 중 오류가 발생했습니다.');
              },
            });
          },
        },
      ]
    );
  };

  const handleDeleteFollower = (userId: string, userName: string) => {
    Alert.alert(
      '팔로워 삭제',
      `${userName}님을 팔로워 목록에서 삭제하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => deleteFollowerMutation.mutate(userId),
        },
      ],
      { cancelable: true }
    );
  };

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
            {type === 'followers' && (
              <TouchableOpacity
                onPress={() => handleDeleteFollower(user.id, user.name)}
                className='px-4 py-2 rounded-full bg-red-500 mr-2'
              >
                <Text className='text-white font-semibold'>삭제</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => handleFollow(user.id, user.name, user.isFollowed)}
              className={`px-4 py-2 rounded-full ${
                type === 'followers'
                  ? user.isFollowed
                    ? 'bg-gray-600'
                    : 'bg-blue-500'
                  : 'bg-gray-600'
              }`}
            >
              <Text className='text-white font-semibold'>
                {type === 'followers'
                  ? user.isFollowed
                    ? '팔로잉'
                    : '맞팔로우'
                  : '팔로잉'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
