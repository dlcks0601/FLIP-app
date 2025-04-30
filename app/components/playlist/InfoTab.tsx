import { View, Text, Image, ScrollView } from 'react-native';
import { Playlist } from '@/types/playlist.type';

interface InfoTabProps {
  totalTracks: number;
  totalMinutes: number;
  totalSeconds: number;
  playlist: Playlist;
}

export default function InfoTab({
  totalTracks,
  totalMinutes,
  totalSeconds,
  playlist,
}: InfoTabProps) {
  return (
    <View>
      <View className='flex-row justify-between p-4 gap-4'>
        <View className='flex-1 bg-[#282828] rounded-lg p-4'>
          <View className='items-start'>
            <Text className='text-[#1DB954] text-4xl font-bold mb-1'>
              {totalTracks}
            </Text>
            <Text className='text-white text-base'>곡 수</Text>
          </View>
        </View>
        <View className='flex-1 bg-[#282828] rounded-lg p-4'>
          <View className='items-start'>
            <Text className='text-[#1DB954] text-4xl font-bold mb-1'>
              {totalMinutes}:{totalSeconds.toString().padStart(2, '0')}
            </Text>
            <Text className='text-white text-base'>플레이리스트 길이</Text>
          </View>
        </View>
      </View>

      <View className='px-4'>
        {playlist.tracks?.items.map((item, index) => (
          <View
            key={item.track.id}
            className='flex-row items-center py-2 gap-3'
          >
            <Image
              source={{ uri: item.track.album.images[0].url }}
              className='w-12 h-12 rounded'
            />
            <View className='flex-1'>
              <Text
                className='text-white text-base font-medium'
                numberOfLines={1}
              >
                {item.track.name}
              </Text>
              <Text className='text-gray-400 text-sm' numberOfLines={1}>
                {item.track.artists.map((artist) => artist.name).join(', ')}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
