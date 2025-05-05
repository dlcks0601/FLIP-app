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

import { Entypo } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { TrackItem } from '@/apis/user.api';

interface TrackDetailProps {
  track: TrackItem;
  onClose: () => void;
}

export default function TrackDetail({ track, onClose }: TrackDetailProps) {
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
    Linking.openURL(track.externalUrl);
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
            <Text className='text-white text-lg font-bold'>트랙 상세</Text>
            <View style={{ width: 24 }} />
          </View>

          <View className='items-center mb-6'>
            <Image
              source={{ uri: track.imageUrl }}
              className='w-64 h-64 rounded-lg mb-4'
            />
            <View className='flex-row items-center gap-2 mb-2'>
              <Text className='text-white text-xl font-bold'>{track.name}</Text>
            </View>
            <Text className='text-gray-400 text-lg mb-4'>
              {track.artistName}
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
