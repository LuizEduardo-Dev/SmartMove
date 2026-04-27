import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10B981', // Verde principal (Emerald)
        tabBarInactiveTintColor: '#64748B', // Cinza inativo
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#10B981',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      {/* Rota principal: vai renderizar o app/index.tsx */}
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

      {/* Rota do comparador: vai renderizar o app/comparador.tsx */}
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

      {/* Rota do ranking: vai renderizar o app/ranking.tsx */}
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