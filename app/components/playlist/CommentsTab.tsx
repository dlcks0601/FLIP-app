import {
  View,
  Keyboard,
  Platform,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import {
  useComments,
  useLikeComment,
  useDeleteComment,
  useAddComment,
} from '@/hooks/playlist.query';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import useAuthStore from '@/store/authStore';
import CommentItem from './CommentItem';
import ActionModal from './ActionModal';

export default function CommentsTab() {
  const { postId } = useLocalSearchParams();
  const { data: comments } = useComments(postId as string);
  const likeComment = useLikeComment();
  const deleteComment = useDeleteComment();
  const addComment = useAddComment();
  const [selectedComment, setSelectedComment] = useState<number | null>(null);
  const { userInfo } = useAuthStore();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleLongPress = async (commentId: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedComment(commentId);
  };

  const handleLike = async (commentId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    likeComment.mutate(commentId);
    setSelectedComment(null);
  };

  const handleDelete = async (commentId: string) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    deleteComment.mutate(commentId);
    setSelectedComment(null);
  };

  const handleReport = async (commentId: string) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    // TODO: 신고 기능 구현
    console.log('신고:', commentId);
    setSelectedComment(null);
  };

  const handleAddComment = async (content: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addComment.mutate({ postId: postId as string, content });
  };

  const selectedCommentData = selectedComment
    ? comments?.comment.find((c) => c.commentId === selectedComment)
    : null;

  const isMyComment = selectedCommentData?.userId === userInfo.userId;

  return (
    <View className='flex-1 bg-[#121212]'>
      <View className='flex-1 items-center'></View>
      <View className='flex-1 p-4'>
        {comments?.comment.map((comment) => (
          <CommentItem
            key={comment.commentId}
            comment={comment}
            onLongPress={() => handleLongPress(comment.commentId)}
            onLike={() => handleLike(comment.commentId.toString())}
          />
        ))}
      </View>

      <ActionModal
        visible={selectedComment !== null}
        onClose={() => setSelectedComment(null)}
        onLike={() => selectedComment && handleLike(selectedComment.toString())}
        onAction={() =>
          selectedComment &&
          (isMyComment
            ? handleDelete(selectedComment.toString())
            : handleReport(selectedComment.toString()))
        }
        isLiked={selectedCommentData?.isLiked || false}
        actionType={isMyComment ? 'delete' : 'report'}
      />
    </View>
  );
}
