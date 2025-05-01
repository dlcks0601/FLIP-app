import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useState } from 'react';

interface CommentInputProps {
  onSubmit: (content: string) => void;
  className?: string;
}

export default function CommentInput({
  onSubmit,
  className,
}: CommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <View className={`border-t border-gray-800 bg-[#121212] ${className}`}>
      <View className='p-4 flex-row items-center gap-2'>
        <TextInput
          className='flex-1 bg-[#282828] text-white rounded-lg px-4 py-3'
          placeholder='댓글을 입력하세요...'
          placeholderTextColor='#666'
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={1000}
          returnKeyType='done'
          blurOnSubmit={Platform.OS === 'ios'}
          style={{ maxHeight: 100 }}
        />
        <TouchableOpacity
          className='bg-[#1DB954] px-4 py-3 rounded-lg'
          onPress={handleSubmit}
        >
          <Text className='text-white font-bold'>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
