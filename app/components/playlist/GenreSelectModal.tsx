import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface GenreSelectModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedGenres: number[];
  onGenreSelect: (genres: number[]) => void;
  genreList: { id: number; name: string }[];
}

export default function GenreSelectModal({
  isVisible,
  onClose,
  selectedGenres,
  onGenreSelect,
  genreList,
}: GenreSelectModalProps) {
  const toggleGenre = (genreId: number) => {
    const newGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];
    onGenreSelect(newGenres);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className='flex-1 justify-end bg-black/50'>
        <View className='bg-[#282828] rounded-t-3xl p-6 h-[100%]'>
          <View className='flex-row items-center mt-12 relative'>
            <TouchableOpacity
              onPress={onClose}
              className='absolute right-0 z-10'
            >
              <AntDesign name='close' size={24} color='white' />
            </TouchableOpacity>
            <View className='flex-1 items-center'>
              <Text className='text-white text-xl font-bold'>장르 선택</Text>
            </View>
          </View>

          <ScrollView
            className='mt-6 flex-1'
            showsVerticalScrollIndicator={false}
          >
            <View className='flex-col items-center gap-4 mb-4'>
              {[...genreList]
                .sort((a, b) => a.id - b.id)
                .map((genre) => (
                  <TouchableOpacity
                    key={genre.id}
                    className={`w-full px-8 py-4 rounded-full ${
                      selectedGenres.includes(genre.id)
                        ? 'bg-[#1DB954]'
                        : 'bg-[#232323]'
                    }`}
                    onPress={() => toggleGenre(genre.id)}
                  >
                    <Text
                      className={
                        selectedGenres.includes(genre.id)
                          ? 'text-black text-center text-lg '
                          : 'text-white text-center text-lg '
                      }
                    >
                      {genre.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            className='bg-[#1DB954] p-4 rounded-lg items-center mb-4 mt-4'
            onPress={onClose}
          >
            <Text className='text-white font-bold'>선택 완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
