import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRelativeTime } from '@/utils/date';
import { Comment } from '@/apis/playlist.api';

interface CommentItemProps {
  comment: Comment;
  onLongPress: () => void;
  onLike: () => void;
}

export default function CommentItem({
  comment,
  onLongPress,
  onLike,
}: CommentItemProps) {
  return (
    <Pressable onLongPress={onLongPress} className='mb-4'>
      <View className='bg-[#282828] rounded-lg p-4'>
        <View className='flex-row items-center justify-between'>
          <View className='flex-col justify-between'>
            <View className='flex-row items-center gap-2 mb-4'>
              <Image
                source={{ uri: comment.userProfileUrl }}
                className='w-8 h-8 rounded-full'
              />
              <Text className='text-white font-bold'>
                {comment.userNickname}
              </Text>
              <Text className='text-gray-400 text-sm'>
                {getRelativeTime(comment.createdAt)}
              </Text>
            </View>
            <Text className='text-white mb-2'>{comment.content}</Text>
          </View>
          <View className='flex-col items-center gap-1'>
            <TouchableOpacity onPress={onLike}>
              <Ionicons
                name={comment.isLiked ? 'heart' : 'heart-outline'}
                size={20}
                color={comment.isLiked ? 'red' : '#b3b3b3'}
              />
            </TouchableOpacity>
            <Text className='text-[#b3b3b3] text-sm'>{comment.likeCount}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
