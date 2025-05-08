import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export interface GenreCategory {
  id: number;
  name: string;
}

interface GenreTabProps {
  genres: GenreCategory[];
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

export default function GenreTab({
  genres,
  selectedGenre,
  setSelectedGenre,
}: GenreTabProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      <View className='gap-2 flex-row mt-2'>
        {[
          { id: -1, name: '전체' },
          ...[...genres].sort((a, b) => a.id - b.id),
        ].map((genre) => {
          const isSelected = selectedGenre === genre.name;
          return (
            <TouchableOpacity
              key={genre.id}
              className={`px-4 py-2 rounded-full items-center justify-center ${
                isSelected ? 'bg-white h-9' : 'bg-[#232323] h-9'
              }`}
              onPress={() => setSelectedGenre(genre.name)}
            >
              <Text
                className={`text-sm text-center font-normal ${
                  isSelected ? 'text-black' : 'text-white'
                }`}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {genre.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
