import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {

  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {

          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 5,

          height: 60 + insets.bottom,
        },
        headerStyle: {
          backgroundColor: '#10B981',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Navegação',
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker-path" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="comparador"
        options={{
          title: 'Impacto Ambiental',
          tabBarLabel: 'Comparador',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="leaf" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Top Usuários',
          tabBarLabel: 'Ranking',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}