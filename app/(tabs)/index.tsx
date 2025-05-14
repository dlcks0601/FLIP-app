import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';

import { useTop5Tracks } from '@/hooks/main.query';
import Top5PlaylistItem from '@/app/components/main/Top5PlaylistItem';

const bannerData = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    text: '🎉 신규 이벤트! 지금 참여하세요!',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    text: '🔥 인기 플레이리스트 모음',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    text: '⭐️ 오늘의 추천 음악',
  },
];

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { data: top5Tracks, isLoading } = useTop5Tracks();

  return (
    <View className='flex-1 bg-[#121212]'>
      <View className='flex-row items-center justify-start px-4'>
        <Text className='text-white text-2xl font-logo'>FLIP</Text>
      </View>
      <ScrollView className='flex-1'>
        {/* 광고 배너 */}
        <FlatList
          data={bannerData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className='mr-3' style={{ width: width * 0.8 }}>
              <Image
                source={{ uri: item.image }}
                className='w-full h-60 rounded-2xl'
                resizeMode='cover'
              />
              <View className='absolute bottom-3 left-4'>
                <Text className='text-white text-lg font-bold drop-shadow-lg'>
                  {item.text}
                </Text>
              </View>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          pagingEnabled
          snapToInterval={width * 0.8 + 12}
          decelerationRate='fast'
        />

        <View className='flex-1 gap-4 mt-4'>
          <View className='flex-col px-4'>
            <Text className='text-white text-2xl font-bold'>
              인기 플레이리스트 🧐
            </Text>
          </View>
          {isLoading ? (
            <ActivityIndicator color='#1DB954' />
          ) : !top5Tracks?.playlist || top5Tracks.playlist.length === 0 ? (
            <Text className='text-gray-400 px-4'>플레이리스트가 없습니다.</Text>
          ) : (
            <FlatList
              data={top5Tracks.playlist}
              keyExtractor={(item) => item.postId.toString()}
              renderItem={({ item }) => (
                <View style={{ width: 180, marginRight: 12 }}>
                  <Top5PlaylistItem playlist={item} />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
