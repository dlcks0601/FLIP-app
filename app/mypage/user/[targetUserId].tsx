import MyPlaylistItem from '@/app/components/mypage/MyPlaylistItem';
import {
  useAnotherUserPageQuery,
  useAnotherUserPlaylistQuery,
} from '@/hooks/mypage.query';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function UserPage() {
  const { targetUserId } = useLocalSearchParams();
  const { data: anotherUserInfo } = useAnotherUserPageQuery(
    targetUserId as string
  );
  const { data: anotherUserPlaylist } = useAnotherUserPlaylistQuery(
    targetUserId as string
  );
  return (
    <View className='flex-1 bg-[#121212] gap-4'>
      <View className='flex-row items-center px-4'>
        <View className='flex-row flex-1 items-center justify-between'>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name='chevron-left' size={32} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className='flex-1'>
        <View className='flex-col items-center gap-4'>
          <View className='flex-col items-center gap-4'>
            <Image
              source={{ uri: anotherUserInfo?.user.profileUrl }}
              className='w-40 h-40 rounded-full'
            />
            <Text className='text-white text-xl font-bold'>
              {anotherUserInfo?.user.name}
            </Text>
          </View>

          <View className='flex-row items-center gap-20 mb-10'>
            <View className='flex-col items-center'>
              <Text className='text-white text-xl font-bold'>
                {anotherUserInfo?.followerCount}
              </Text>
              <Text className='text-gray-300 text-md font-light'>팔로워</Text>
            </View>
            <View className='flex-col items-center'>
              <Text className='text-white text-xl font-bold'>
                {anotherUserInfo?.followingCount}
              </Text>
              <Text className='text-gray-300 text-md font-light'>팔로잉</Text>
            </View>
            <View className='flex-col items-center'>
              <Text className='text-white text-xl font-bold'>
                {anotherUserInfo?.playlistCount}
              </Text>
              <Text className='text-gray-300 text-md font-light'>게시물</Text>
            </View>
          </View>
          <View className='flex-col gap-4 mb-4'>
            <View className='flex-col'>
              <Text className='text-white text-xl font-bold mb-4 px-4'>
                {anotherUserInfo?.user.name} 플레이리스트
              </Text>
              {!anotherUserPlaylist || anotherUserPlaylist.length === 0 ? (
                <View className='flex items-center justify-center px-4 py-4'>
                  <Text className='text-gray-400'>
                    플레이리스트가 없습니다.
                  </Text>
                </View>
              ) : (
                <>
                  {anotherUserPlaylist.slice(0, 3).map((playlist) => (
                    <MyPlaylistItem key={playlist.postId} playlist={playlist} />
                  ))}
                  {anotherUserPlaylist.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        router.push(`/playlist/user/${targetUserId}?type=my`)
                      }
                      className='mx-32 mt-4 py-3 rounded-full border border-gray-500 mb-4'
                    >
                      <Text className='text-white text-center text-sm'>
                        플레이리스트 모두 보기
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
