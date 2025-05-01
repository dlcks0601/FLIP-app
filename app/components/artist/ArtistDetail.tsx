import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Linking,
  PanResponder,
  Animated,
} from 'react-native';
import { Artist } from '@/apis/user.api';
import { Entypo } from '@expo/vector-icons';
import { useRef, useState } from 'react';

interface ArtistDetailProps {
  artist: Artist;
  onClose: () => void;
}

export default function ArtistDetail({ artist, onClose }: ArtistDetailProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      const { dy } = gestureState;
      return dy > 0 && !isDragging;
    },
    onPanResponderGrant: () => {
      setIsDragging(true);
    },
    onPanResponderMove: (_, gestureState) => {
      const { dy } = gestureState;
      if (dy > 0) {
        pan.y.setValue(dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      const { dy, vy } = gestureState;
      setIsDragging(false);

      if (dy > 100 || vy > 0.5) {
        onClose();
      } else {
        Animated.spring(pan.y, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleOpenSpotify = () => {
    Linking.openURL(artist.externalUrl);
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: 'black',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        transform: [{ translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <View className='w-full items-center pt-4 mb-2'>
        <View className='w-16 h-1 bg-gray-600/50 rounded-full' />
      </View>
      <ScrollView
        className='flex-1'
        scrollEnabled={!isDragging}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View className='px-4 pb-8'>
          <View className='flex-1 items-center mb-4'>
            <Text className='text-white text-lg font-bold'>아티스트 상세</Text>
            <View style={{ width: 24 }} />
          </View>

          <View className='items-center mb-6'>
            <Image
              source={{ uri: artist.image }}
              className='w-64 h-64 rounded-full mb-4'
            />
            <View className='flex-row items-center gap-2 mb-2'>
              <Text className='text-white text-xl font-bold'>
                {artist.name}
              </Text>
            </View>
            <Text className='text-gray-400 text-base mb-4'>
              {artist.genres?.join(', ')}
            </Text>

            <Pressable
              onPress={handleOpenSpotify}
              className='bg-[#1DB954] px-6 py-3 rounded-md flex-row items-center'
            >
              <Entypo name='spotify' size={20} color='white' className='mr-2' />
              <Text className='text-white font-bold'>Open in Spotify</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
