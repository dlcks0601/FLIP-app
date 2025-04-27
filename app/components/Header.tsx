import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from './Logo';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const router = useRouter();

  return (
    <View className='h-14 px-4 flex-row items-center justify-between bg-black'>
      <View className='flex-row items-center'>
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} className='mr-4'>
            <Text className='text-white text-lg'>←</Text>
          </TouchableOpacity>
        )}
        {/* <Logo width={100} height={24} /> */}
        <Text className='text-white font-black text-xl'>{title}</Text>
      </View>
    </View>
  );
}
