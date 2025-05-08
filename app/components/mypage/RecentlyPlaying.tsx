import { View, Text, Image } from 'react-native';
import SpotifyIcon from '../SpotifyIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { Track } from '@/apis/main.api';

interface RecentlyPlayingProps {
  track: Track;
}

export default function RecentlyPlaying({ track }: RecentlyPlayingProps) {
  return (
    <LinearGradient
      colors={['#525252', '#000000']}
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
          <Text className='text-white font-bold text-xl'>최근 재생</Text>
          <SpotifyIcon fill='#1DB954' />
        </View>

        <View className='flex-row items-start gap-4 w-full'>
          <Image
            source={{ uri: track.album.images[0]?.url }}
            className='w-20 h-20'
          />
          <View className='flex-col flex-1 items-start gap-1'>
            <Text className='text-white text-xl font-bold'>{track.name}</Text>
            <Text className='text-gray-300 text-sm'>
              {track.artists.map((a) => a.name).join(', ')}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
