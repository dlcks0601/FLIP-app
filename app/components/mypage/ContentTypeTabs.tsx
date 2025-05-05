import { View, Text, TouchableOpacity } from 'react-native';

export type ContentType = 'tracks' | 'artists' | 'genres';

interface ContentTypeTabsProps {
  contentType: ContentType;
  onContentTypeChange: (type: ContentType) => void;
}

const contentTypeLabels = {
  tracks: '트랙',
  artists: '아티스트',
  genres: '장르',
};

export default function ContentTypeTabs({
  contentType,
  onContentTypeChange,
}: ContentTypeTabsProps) {
  return (
    <View className='mt-1'>
      <View className='flex-row justify-between'>
        {Object.entries(contentTypeLabels).map(([type, label]) => (
          <TouchableOpacity
            key={type}
            onPress={() => onContentTypeChange(type as ContentType)}
            className='py-3'
          >
            <Text
              className={`px-10 ${
                contentType === type ? 'text-[#1DB954]' : 'text-gray-400'
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
