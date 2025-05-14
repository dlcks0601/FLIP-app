import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import SpotifyIcon from '../SpotifyIcon';

interface TrackDetailModalProps {
  isVisible: boolean;
  onClose: () => void;
  track: {
    trackId: string;
    title: string;
    artistName: string;
    imageUrl: string;
    externalUrl: string;
    durationMs: number;
  } | null;
}

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function TrackDetailModal({
  isVisible,
  onClose,
  track,
}: TrackDetailModalProps) {
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!track) {
      onClose();
      return;
    }

    Animated.timing(overlayOpacity, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible, track]);

  const handleOpenSpotify = async () => {
    if (track?.externalUrl) {
      const canOpen = await Linking.canOpenURL(track.externalUrl);
      if (canOpen) {
        await Linking.openURL(track.externalUrl);
      }
    }
  };

  if (!track) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='none'
      onRequestClose={onClose}
    >
      <View className='flex-1 justify-end'>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#00000045',
            opacity: overlayOpacity,
          }}
        />
        <View className='bg-[#282828] rounded-t-3xl p-6' style={{ zIndex: 1 }}>
          <View className='items-center mb-2'>
            <View className='w-12 h-1 bg-gray-600 rounded-full mb-6' />
          </View>

          <View className='items-center mb-6'>
            <Image
              source={{ uri: track.imageUrl }}
              className='w-48 h-48 rounded-lg mb-4'
            />
            <Text className='text-white text-xl font-bold mb-2 text-center'>
              {track.title}
            </Text>
            <Text className='text-gray-400 text-lg'>{track.artistName}</Text>
          </View>

          <View className='flex-row gap-3 mb-6'>
            <TouchableOpacity
              onPress={handleOpenSpotify}
              className='flex-1 flex-row items-center justify-center bg-[#1DB954] py-3 rounded-full gap-2'
            >
              <SpotifyIcon fill='white' />
              <Text className='text-white font-bold'>Spotify에서 듣기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              className='flex-1 bg-gray-600 py-3 rounded-full items-center justify-center'
            >
              <Text className='text-white text-center font-bold'>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
