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

interface ArtistListProps {
  artists: ArtistItem[] | undefined;
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

  const renderItem = ({ item, index }: { item: ArtistItem; index: number }) => (
    <Pressable
      onPress={() => handleArtistPress(item)}
      className={`mb-4 ${index % 2 === 0 ? 'mr-3' : ''}`}
      style={{ width: ITEM_WIDTH }}
    >
      <Image
        source={{ uri: item.imageUrl }}
        className='w-full aspect-square rounded-full mb-2'
      />

      <Text className='text-white font-medium' numberOfLines={1}>
        {item.name}
      </Text>
    </Pressable>
  );

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
