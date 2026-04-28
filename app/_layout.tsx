import { Stack, Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '../src/store/useUserStore';
import { lightTheme, darkTheme } from '../src/store/Colors';


export default function AppLayout() {

  const insets = useSafeAreaInsets();
  const { isLogado, theme } = useUserStore();

  const colors = theme === 'light' ? lightTheme : darkTheme;
  
  if (!isLogado) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='cadastro' />
      </Stack>
    )
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 5,
          height: 60 + insets.bottom,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff', // Geralmente branco funciona em cima da cor primária
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

      <Tabs.Screen
        name='perfil'
        options={{
          title: 'Minha Conta',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (

            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="cadastro"
        options={{
          href: null, // O PULO DO GATO: Isso diz ao Expo para não criar o botão no rodapé!
        }}
      />

    </Tabs>
  );
}