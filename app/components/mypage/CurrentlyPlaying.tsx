import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SpotifyIcon from '../SpotifyIcon';

interface CurrentlyPlayingProps {
  item: {
    album: { images: { url: string }[] };
    name: string;
    artists: { name: string }[];
  };
}

export default function CurrentlyPlaying({ item }: CurrentlyPlayingProps) {
  return (
    <View className='flex-col items-center bg-[#232323] rounded-xl p-4 gap-4'>
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
  );
}
