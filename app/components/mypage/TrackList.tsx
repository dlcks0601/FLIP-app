import { TrackItem } from '@/apis/user.api';
import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import TrackDetail from '../track/TrackDetail';

interface TrackListProps {
  tracks: TrackItem[];
}

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const PADDING = 14;
const GAP = 12;
const ITEM_WIDTH = (width - PADDING * 2 - GAP) / COLUMN_COUNT;

export default function TrackList({ tracks }: TrackListProps) {
  const [selectedTrack, setSelectedTrack] = useState<TrackItem | null>(null);

  const handleTrackPress = (track: TrackItem) => {
    setSelectedTrack(track);
  };

  const handleCloseDetail = () => {
    setSelectedTrack(null);
  };

  const renderItem = ({ item, index }: { item: TrackItem; index: number }) => {
    const getRankChangeIcon = () => {
      if (item.diff === null) return 'plus';
      if (item.diff === 0) return 'minus';
      if (item.diff > 0) return 'triangle-up';
      if (item.diff < 0) return 'triangle-down';
      return 'minus';
    };

    const getRankChangeColor = () => {
      if (item.diff === null) return '#00ff44';
      if (item.diff === 0) return '#9E9E9E';
      if (item.diff > 0) return '#1E90FF';
      if (item.diff < 0) return '#F44336';
      return '#9E9E9E';
    };

    return (
      <Pressable
        onPress={() => handleTrackPress(item)}
        className={`flex-1 mb-4 ${index % 2 === 0 ? 'mr-3' : ''}`}
        style={{ width: ITEM_WIDTH }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          className='w-full aspect-square rounded-md mb-2'
        />
        <View className='flex-col items-start gap-1'>
          <View className='flex-row itemsap-2 gap-1'>
            <Text className='text-gray-400 font-bold' numberOfLines={1}>
              {item.rank}.
            </Text>
            <View className='flex-row flex-1 w-full justify-between'>
              <Text className='flex-1 text-white font-bold' numberOfLines={1}>
                {item.name}
              </Text>
              <Entypo
                name={getRankChangeIcon()}
                size={16}
                color={getRankChangeColor()}
                style={{ marginLeft: 4 }}
              />
            </View>
          </View>
          <Text className='text-gray-400 text-sm' numberOfLines={1}>
            {item.artistName}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        key={`grid-${COLUMN_COUNT}`}
        data={tracks}
        keyExtractor={(item) => item.rank.toString()}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: PADDING,
        }}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
        }}
        renderItem={renderItem}
      />

      <Modal
        visible={selectedTrack !== null}
        animationType='slide'
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={handleCloseDetail}
      >
        {selectedTrack && (
          <View className='flex-1'>
            <View className='h-[93%] mt-auto'>
              <TrackDetail track={selectedTrack} onClose={handleCloseDetail} />
            </View>
          </View>
        )}
      </Modal>
    </>
  );
}
