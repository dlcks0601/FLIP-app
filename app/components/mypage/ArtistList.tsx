import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';
import { ArtistItem } from '@/apis/user.api';
import { useState } from 'react';
import ArtistDetail from '../artist/ArtistDetail';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

interface ArtistListProps {
  artists: ArtistItem[];
}

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const PADDING = 14;
const GAP = 12;
const ITEM_WIDTH = (width - PADDING * 2 - GAP) / COLUMN_COUNT;

export default function ArtistList({ artists }: ArtistListProps) {
  const [selectedArtist, setSelectedArtist] = useState<ArtistItem | null>(null);

  const handleArtistPress = (artist: ArtistItem) => {
    setSelectedArtist(artist);
  };

  const handleCloseDetail = () => {
    setSelectedArtist(null);
  };

  const renderItem = ({ item, index }: { item: ArtistItem; index: number }) => {
    const getRankChangeIcon = () => {
      if (item.diff === null) return 'plus';
      if (item.diff === 0) return 'minus';
      if (item.diff > 0) return 'triangle-up';
      if (item.diff < 0) return 'triangle-down';
      return 'minus';
    };

    const getRankChangeColor = () => {
      if (item.diff === null) return '#0062ff';
      if (item.diff === 0) return '#9E9E9E';
      if (item.diff > 0) return '#4CAF50';
      if (item.diff < 0) return '#F44336';
      return '#9E9E9E';
    };
    return (
      <Pressable
        onPress={() => handleArtistPress(item)}
        className={`mb-4 ${index % 2 === 0 ? 'mr-3' : ''}`}
        style={{ width: ITEM_WIDTH }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          className='w-full aspect-square rounded-full mb-2'
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
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        data={artists}
        renderItem={renderItem}
        keyExtractor={(item) => item.rank.toString()}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: PADDING,
        }}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
        }}
      />

      <Modal
        visible={selectedArtist !== null}
        animationType='slide'
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={handleCloseDetail}
      >
        {selectedArtist && (
          <View className='flex-1'>
            <View className='h-[93%] mt-auto'>
              <ArtistDetail
                artist={selectedArtist}
                onClose={handleCloseDetail}
              />
            </View>
          </View>
        )}
      </Modal>
    </>
  );
}
