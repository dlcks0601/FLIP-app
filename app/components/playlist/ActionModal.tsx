import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  onLike: () => void;
  onAction: () => void;
  isLiked: boolean;
  actionType: 'delete' | 'report';
}

export default function ActionModal({
  visible,
  onClose,
  onLike,
  onAction,
  isLiked,
  actionType,
}: ActionModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <Pressable className='flex-1 bg-black/50' onPress={onClose}>
        <View className='flex-1 justify-end pb-12'>
          <View className='mx-4 bg-[#282828] rounded-xl overflow-hidden'>
            <TouchableOpacity
              className='p-4 border-b border-gray-700'
              onPress={onLike}
            >
              <Text className='text-white text-center text-lg'>
                {isLiked ? '좋아요 취소' : '좋아요'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className='p-4' onPress={onAction}>
              <Text
                className={`text-center text-lg ${
                  actionType === 'delete' ? 'text-red-500' : 'text-yellow-500'
                }`}
              >
                {actionType === 'delete' ? '삭제' : '신고'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
