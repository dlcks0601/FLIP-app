import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { Artist } from '@/apis/user.api';

interface ArtistListProps {
  artists: Artist[] | undefined;
}

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const PADDING = 14;
const GAP = 12;
const ITEM_WIDTH = (width - PADDING * 2 - GAP) / COLUMN_COUNT;

export default function ArtistList({ artists }: ArtistListProps) {
  const renderItem = ({ item, index }: { item: Artist; index: number }) => (
    <View
      className={`mb-4 ${index % 2 === 0 ? 'mr-3' : ''}`}
      style={{ width: ITEM_WIDTH }}
    >
      <Image
        source={{ uri: item.image }}
        className='w-full aspect-square rounded-full mb-2'
      />
      <Text className='text-white font-medium' numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );

  return (
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
  );
}
