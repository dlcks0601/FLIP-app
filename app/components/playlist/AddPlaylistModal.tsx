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
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useAddPlaylist, useGenreCategory } from '@/hooks/playlist.query';

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
  const { mutate: addPlaylist, isPending } = useAddPlaylist();

  // 장르 목록 불러오기
  const { data: genreData } = useGenreCategory();
  const genreList = genreData?.genres ?? [];

  // 장르 토글 함수
  const toggleGenre = (genre: number) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleAddPlaylist = () => {
    if (!link.trim()) {
      Alert.alert('알림', '링크를 입력해주세요.');
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
              playlistUrl: link,
              explanation,
              genres,
            },
            {
              onSuccess: () => {
                setLink('');
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
              placeholder='설명을 입력하세요'
              placeholderTextColor='#9CA3AF'
              value={explanation}
              onChangeText={setExplanation}
              multiline
            />

            <View className='mb-6'>
              <Text className='text-white mb-2'>장르 선택</Text>
              <View className='flex-row flex-wrap gap-2'>
                {genreList.map((genre) => (
                  <TouchableOpacity
                    key={genre.id}
                    className={`px-4 py-2 rounded-full ${
                      genres.includes(genre.id) ? 'bg-white' : 'bg-[#232323]'
                    }`}
                    onPress={() => toggleGenre(genre.id)}
                  >
                    <Text
                      className={
                        genres.includes(genre.id) ? 'text-black' : 'text-white'
                      }
                    >
                      {genre.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
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
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
