import {
  View,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  Modal,
} from 'react-native';
import { useUserTopGenreStats } from '@/hooks/user.query';
import { useState } from 'react';
import { GenreItem } from '@/apis/user.api';
import GenreDetail from '../genre/GenreDetail';
import React from 'react';

const { width } = Dimensions.get('window');
const PADDING = 14;
const ITEM_WIDTH = width - PADDING * 2;

interface GenreListProps {
  timeRange: string;
}

export default function GenreList({ timeRange }: GenreListProps) {
  const { data: genreStats, isLoading } = useUserTopGenreStats(timeRange);
  const [selectedGenre, setSelectedGenre] = useState<GenreItem | null>(null);

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-white'>로딩 중...</Text>
      </View>
    );
  }

  if (!genreStats || genreStats.genres.length === 0) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-white text-lg'>
          {timeRange === 'long'
            ? '일년 동안의 장르 기록이 없습니다.'
            : timeRange === 'medium'
            ? '6개월 동안의 장르 기록이 없습니다.'
            : '한 달 동안의 장르 기록이 없습니다.'}
        </Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: GenreItem; index: number }) => {
    return (
      <View className='mb-4' style={{ width: ITEM_WIDTH }}>
        <View className='bg-[#282828] p-4 rounded-lg'>
          <View className='flex-col gap-1'>
            <View className='flex-row items-center gap-1'>
              <Text className='text-gray-400 font-bold'>{item.rank}.</Text>
              <Text className='text-white font-bold' numberOfLines={1}>
                {item.genre}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={genreStats.genres}
      keyExtractor={(item) => item.genre}
      contentContainerStyle={{
        paddingVertical: 20,
        paddingHorizontal: PADDING,
      }}
      renderItem={renderItem}
    />
  );
}
