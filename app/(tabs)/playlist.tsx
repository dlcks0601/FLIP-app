import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

import { usePlaylists } from '@/hooks/playlist.query';
import AddPlaylistModal from '@/app/components/playlist/AddPlaylistModal';
import PlaylistItem from '@/app/components/playlist/PlaylistItem';

export default function PlaylistScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: playlists = [] } = usePlaylists();

  return (
    <View className='flex-1 bg-[#121212]'>
      <View className='flex-row items-center justify-between px-4 py-2'>
        {/* 헤더 */}
        <Text className='text-white text-xl font-bold'>플레이리스트</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <AntDesign name='plus' size={24} color='white' />
        </TouchableOpacity>
      </View>

      <FlatList
        data={playlists}
        renderItem={({ item }) => (
          <View className='w-1/2 p-2'>
            <PlaylistItem playlist={item} />
          </View>
        )}
        keyExtractor={(item) => item.playlistId}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <AddPlaylistModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}
