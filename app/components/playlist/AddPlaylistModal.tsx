import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { useAddPlaylist, useGenreCategory } from '@/hooks/playlist.query';
import GenreSelectModal from './GenreSelectModal';

interface AddPlaylistModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AddPlaylistModal({
  isVisible,
  onClose,
}: AddPlaylistModalProps) {
  const [link, setLink] = useState('');
  const [explanation, setExplanation] = useState('');
  const [genres, setGenres] = useState<number[]>([]);
  const [isGenreModalVisible, setIsGenreModalVisible] = useState(false);
  const { mutate: addPlaylist, isPending } = useAddPlaylist();

  // 장르 목록 불러오기
  const { data: genreData } = useGenreCategory();
  const genreList = genreData?.genres ?? [];

  // 선택된 장르 이름 가져오기
  const getSelectedGenreNames = () => {
    return genres
      .map((id) => genreList.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const handleAddPlaylist = () => {
    if (!link.trim()) {
      Alert.alert('알림', '링크를 입력해주세요.');
      return;
    }

    if (genres.length === 0) {
      Alert.alert('알림', '장르를 선택해주세요.');
      return;
    }

    Alert.alert('플레이리스트 추가', '이 플레이리스트를 추가하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '추가',
        onPress: () => {
          addPlaylist(
            {
              playlistUrl: link.trim(),
              explanation: explanation.trim() || '',
              genres,
            },
            {
              onSuccess: () => {
                setLink('');
                setExplanation('');
                setGenres([]);
                onClose();
              },
              onError: () => {
                Alert.alert('오류', '플레이리스트 추가에 실패했습니다.');
              },
            }
          );
        },
      },
    ]);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1 justify-end'
        >
          <View
            className='bg-[#282828] rounded-t-3xl p-6'
            style={{ paddingBottom: 40 }}
          >
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-white text-xl font-bold'>
                새 플레이리스트
              </Text>
              <TouchableOpacity onPress={onClose}>
                <AntDesign name='close' size={24} color='white' />
              </TouchableOpacity>
            </View>

            <TextInput
              className='bg-[#404040] text-white p-4 rounded-lg mb-4 h-12'
              placeholder='링크를 입력하세요'
              placeholderTextColor='#9CA3AF'
              value={link}
              onChangeText={setLink}
            />

            <TextInput
              className='bg-[#404040] text-white p-4 rounded-lg mb-4 h-20'
              placeholder='설명을 입력하세요 (선택)'
              placeholderTextColor='#9CA3AF'
              value={explanation}
              onChangeText={setExplanation}
              multiline
            />

            <View className='mb-6'>
              <Text className='text-white mb-2'>장르 선택</Text>
              <TouchableOpacity
                className='bg-[#404040] p-4 rounded-lg flex-row justify-between items-center'
                onPress={() => setIsGenreModalVisible(true)}
              >
                <Text className='text-white'>
                  {genres.length > 0
                    ? getSelectedGenreNames()
                    : '장르를 선택해주세요'}
                </Text>
                <Feather name='chevron-down' size={20} color='white' />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className='bg-[#1DB954] p-4 rounded-lg items-center'
              onPress={handleAddPlaylist}
              disabled={isPending}
            >
              <Text className='text-white font-bold'>
                {isPending ? '추가중...' : '추가하기'}
              </Text>
            </TouchableOpacity>

            <GenreSelectModal
              isVisible={isGenreModalVisible}
              onClose={() => setIsGenreModalVisible(false)}
              selectedGenres={genres}
              onGenreSelect={setGenres}
              genreList={genreList}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
