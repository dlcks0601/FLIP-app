import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import SpotifyIcon from '../SpotifyIcon';
import { CommentResponse } from '@/apis/playlist.api';

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

interface InfoTabProps {
  info?: CommentResponse;
}

export default function InfoTab({ info }: InfoTabProps) {
  if (!info) return null;

  const handleOpenSpotify = async () => {
    const playlistId = info.externalUrl;
    const webUrl = `https://open.spotify.com/playlist/${playlistId}`;

    if (webUrl) {
      const canOpen = await Linking.canOpenURL(webUrl);
      if (canOpen) {
        await Linking.openURL(webUrl);
      }
    }
  };

  return (
    <View>
      <View className='flex-col justify-between p-4 gap-4'>
        <View className='flex-row gap-4'>
          <View className='flex-1 bg-[#282828] rounded-lg p-4'>
            <View className='items-start'>
              <Text className='text-[#1DB954] text-4xl font-bold mb-1'>
                {info.totalTrack}
              </Text>
              <Text className='text-white text-base'>곡 수</Text>
            </View>
          </View>
          <View className='flex-1 bg-[#282828] rounded-lg p-4'>
            <View className='items-start'>
              <Text className='text-[#1DB954] text-4xl font-bold mb-1'>
                {formatDuration(info.totalDuration)}
              </Text>
              <Text className='text-white text-base'>플레이리스트 길이</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className='flex-row items-center px-4 py-2 gap-2'
        onPress={handleOpenSpotify}
      >
        <SpotifyIcon fill='#1DB954' />
        <Text className='text-[#1DB954] text-sm'>Spotify에서 열기</Text>
      </TouchableOpacity>

      <View className='px-4'>
        {info.tracks.map((item, index) => (
          <View key={item.trackId} className='flex-row items-center py-2 gap-3'>
            <Image
              source={{ uri: item.imageUrl }}
              className='w-12 h-12 rounded'
            />
            <View className='flex-1'>
              <Text
                className='text-white text-base font-medium'
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text className='text-gray-400 text-sm' numberOfLines={1}>
                {item.artistName}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
