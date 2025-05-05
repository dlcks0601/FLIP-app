import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useRef, useState } from 'react';
import { GenreItem } from '@/apis/user.api';

interface GenreDetailProps {
  genre: GenreItem;
  onClose: () => void;
}

export default function GenreDetail({ genre, onClose }: GenreDetailProps) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);
  const [isScrollAtTop, setIsScrollAtTop] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    setIsScrollAtTop(contentOffset.y <= 0);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      const { dy } = gestureState;
      // 스크롤이 맨 위에 있을 때만 아래로 드래그해서 모달을 닫을 수 있음
      return isScrollAtTop && dy > 0 && !isDragging;
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
        ref={scrollViewRef}
        className='flex-1'
        bounces={isScrollAtTop}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View className='px-4 pb-8'>
          <View className='flex-1 items-center mb-4'>
            <Text className='text-white text-lg font-bold'>장르 상세</Text>
          </View>

          <View className='items-center mb-6'>
            <Text className='text-white text-xl font-bold mb-2'>
              {genre.genre}
            </Text>
            <Text className='text-gray-400 text-lg mb-6'>
              {genre.artistData.length}명의 아티스트
            </Text>
          </View>

          <View className='bg-[#282828] rounded-lg p-4'>
            <Text className='text-gray-400 mb-4 text-lg'>아티스트 목록</Text>
            {genre.artistData.map((artist) => (
              <View
                key={artist.id}
                className='flex-row items-center mb-4 last:mb-0'
              >
                <Image
                  source={{ uri: artist.imageUrl }}
                  className='w-12 h-12 rounded-full mr-3'
                />
                <Text className='text-white text-base'>{artist.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}
