import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { Foundation, Ionicons, MaterialIcons } from '@expo/vector-icons';
import authStore from '@/store/authStore';

export default function TabsLayout() {
  const { userInfo } = authStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          paddingTop: 5,
          paddingBottom: 30,
          backgroundColor: '#121212',
          borderTopWidth: 0,
          borderTopColor: '#282828',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name='home' color={color} size={24} />
          ),
          tabBarActiveTintColor: '#1ED760',
          tabBarInactiveTintColor: '#ffffff',
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name='playlist'
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='playlist-play' color={color} size={32} />
          ),
          tabBarActiveTintColor: '#1ED760',
          tabBarInactiveTintColor: '#ffffff',
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name='stats'
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='stats-chart-sharp' size={22} color={color} />
          ),
          tabBarActiveTintColor: '#1ED760',
          tabBarInactiveTintColor: '#ffffff',
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name='mypage'
        options={{
          tabBarIcon: ({ color, focused }) =>
            userInfo?.profileUrl ? (
              <Image
                source={{ uri: userInfo.profileUrl }}
                className={`w-8 h-8 rounded-full border ${
                  focused ? 'border-[#1ed760]' : 'border-gray-500'
                }`}
              />
            ) : (
              <Ionicons name='person-outline' size={24} color={color} />
            ),
          tabBarInactiveTintColor: '#ffffff',
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
