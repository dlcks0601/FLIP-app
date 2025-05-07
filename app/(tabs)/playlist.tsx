import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

import AddPlaylistModal from '@/app/components/playlist/AddPlaylistModal';
import PlaylistItem from '@/app/components/playlist/PlaylistItem';
import GenreTab from '@/app/components/playlist/GenreTab';

import {
  usePlaylists,
  usePlaylistGenre,
  useGenreCategory,
} from '@/hooks/playlist.query';

export default function PlaylistScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('전체');

  // 장르 목록
  const { data: genreData, isLoading: isGenreLoading } = useGenreCategory();
  const genreList = genreData?.genres ?? [];

  // 선택된 장르 ID
  const selectedGenreObj = genreList.find((g) => g.name === selectedGenre);
  const genreId = selectedGenreObj?.id;

  // 전체 / 장르별 쿼리
  const { data: allPlaylists, isLoading: isAllLoading } = usePlaylists();
  const { data: genrePlaylists, isLoading: isGenreLoadingPlaylists } =
    usePlaylistGenre(genreId ?? -1);

  const isGenreAll = selectedGenre === '전체';
  const playlists = isGenreAll ? allPlaylists ?? [] : genrePlaylists ?? [];
  const isPlaylistLoading = isGenreAll ? isAllLoading : isGenreLoadingPlaylists;

  return (
    <View className='flex-1 bg-[#121212] gap-3'>
      <View className='flex-col gap-2'>
        {/* 헤더 */}
        <View className='flex-row items-center justify-between px-4'>
          <Text className='text-white text-xl font-logo'>PLAYLIST</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <AntDesign name='plus' size={24} color='white' />
          </TouchableOpacity>
        </View>
        {/* 장르 탭 */}

        <GenreTab
          genres={genreList}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </View>

      {/* 플레이리스트 목록 */}
      {isPlaylistLoading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color='#ffffff' />
        </View>
      ) : playlists.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-white'>플레이리스트가 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={playlists}
          renderItem={({ item }) => (
            <View className='w-1/2 p-2'>
              <PlaylistItem playlist={item} />
            </View>
          )}
          keyExtractor={(item) => item.playlistId.toString()}
          numColumns={2}
        />
      )}

      {/* 추가 모달 */}
      <AddPlaylistModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}
