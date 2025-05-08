import { View, Text, Image } from 'react-native';

import SpotifyIcon from '../SpotifyIcon';
import { LinearGradient } from 'expo-linear-gradient';
interface CurrentlyPlayingProps {
  item: {
    album: { images: { url: string }[] };
    name: string;
    artists: { name: string }[];
  };
}

export default function CurrentlyPlaying({ item }: CurrentlyPlayingProps) {
  return (
    <LinearGradient
      colors={['#15281c', '#000000']} // 원하는 그라데이션 색상
      locations={[0, 0.5]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.4, y: 2 }}
      style={{
        padding: 16,
        borderRadius: 8,
      }}
    >
      <View className='flex-col gap-4'>
        <View className='flex-row items-center w-full justify-between'>
          <Text className='text-white font-bold text-xl'>현재 재생 중</Text>
          <SpotifyIcon fill='#1DB954' />
        </View>

        <View className='flex-row items-start gap-4 w-full'>
          <Image
            source={{ uri: item.album.images[0]?.url }}
            className='w-20 h-20'
          />
          <View className='flex-col flex-1 items-start gap-1'>
            <Text className=' text-white text-xl font-bold'>{item.name}</Text>
            <Text className='text-gray-300 text-sm'>
              {item.artists.map((a) => a.name).join(', ')}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
