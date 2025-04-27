import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          paddingBottom: 30,
          backgroundColor: 'black',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={24} />
          ),
          tabBarActiveTintColor: '#aaffbc',
          tabBarInactiveTintColor: '#ffffff',
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
