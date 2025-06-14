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
  Animated,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
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

  const { data: genreData } = useGenreCategory();
  const genreList = genreData?.genres ?? [];

  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

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
      { text: '취소', style: 'cancel' },
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
      animationType='none'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1 justify-end'
        >
          <Animated.View
            pointerEvents={isVisible ? 'auto' : 'none'}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#00000099',
              opacity: overlayOpacity,
            }}
          />

          <View className='bg-zinc-800 rounded-t-3xl p-6 pb-10'>
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-white text-xl font-bold'>
                새 플레이리스트
              </Text>
              <TouchableOpacity onPress={onClose}>
                <AntDesign name='close' size={24} color='white' />
              </TouchableOpacity>
            </View>

            <TextInput
              className='bg-zinc-700 text-white px-4 py-3 rounded-lg mb-4 h-12'
              placeholder='링크를 입력하세요'
              placeholderTextColor='#9CA3AF'
              value={link}
              onChangeText={setLink}
            />

            <TextInput
              className='bg-zinc-700 text-white px-4 py-3 rounded-lg mb-4 h-20'
              placeholder='설명을 입력하세요 (선택)'
              placeholderTextColor='#9CA3AF'
              value={explanation}
              onChangeText={setExplanation}
              multiline
            />

            <View className='mb-6'>
              <Text className='text-white mb-2'>장르 선택</Text>
              <TouchableOpacity
                className='bg-zinc-700 px-4 py-3 rounded-lg flex-row justify-between items-center'
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
              className='bg-[#1DB954] px-4 py-4 rounded-lg items-center'
              onPress={handleAddPlaylist}
              disabled={isPending}
            >
              <Text className='text-white font-bold'>추가하기</Text>
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
