import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { Track } from '@/apis/user.api';

interface TrackListProps {
  tracks: Track[];
}

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const PADDING = 14;
const GAP = 12;
const ITEM_WIDTH = (width - PADDING * 2 - GAP) / COLUMN_COUNT;

export default function TrackList({ tracks }: TrackListProps) {
  const renderItem = ({ item, index }: { item: Track; index: number }) => (
    <View
      className={`mb-4 ${index % 2 === 0 ? 'mr-3' : ''}`}
      style={{ width: ITEM_WIDTH }}
    >
      <Image
        source={{ uri: item.image }}
        className='w-full aspect-square rounded-md mb-2'
      />
      <View className='flex-row gap-2'>
        <Text className='text-white font-medium' numberOfLines={1}>
          {item.rank}.
        </Text>
        <View>
          <Text className='text-white font-medium' numberOfLines={1}>
            {item.title}
          </Text>
          <Text className='text-gray-400 text-sm' numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
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
  );
}
