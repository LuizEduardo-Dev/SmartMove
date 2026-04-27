// app/ranking.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserStore } from '../src/store/useUserStore';
import { RANKING_MOCK, RankingItem } from '../src/mocks/ranking';

export default function RankingScreen() {
  const { nome, pontos } = useUserStore();

  const listaCompleta: RankingItem[] = [
    ...RANKING_MOCK,
    { id: 'user-01', nome, pontos, isUser: true }
  ].sort((a, b) => b.pontos - a.pontos);

  const renderItem = ({ item, index }: { item: RankingItem; index: number }) => {
    const isTop3 = index < 3;
    const medalColor = index === 0 ? '#FBBF24' : index === 1 ? '#94A3B8' : '#D97706';

    return (
      <View style={[styles.card, item.isUser && styles.cardUser]}>
        <View style={styles.rankContainer}>
          {isTop3 ? (
            <MaterialCommunityIcons name="medal" size={28} color={medalColor} />
          ) : (
            <Text style={styles.rankText}>{index + 1}º</Text>
          )}
        </View>

        <Image 
          source={{ uri: item.avatar || `https://ui-avatars.com/api/?name=${item.nome}&background=10B981&color=fff` }} 
          style={styles.avatar} 
        />

        <View style={styles.infoContainer}>
          <Text style={[styles.nome, item.isUser && styles.nomeUser]}>
            {item.nome} {item.isUser && '(Você)'}
          </Text>
          <Text style={styles.pontos}>{item.pontos} XP</Text>
        </View>

        {item.isUser && (
          <MaterialCommunityIcons name="star" size={24} color="#10B981" />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sua Pontuação</Text>
        <View style={styles.scoreBadge}>
          <MaterialCommunityIcons name="leaf" size={24} color="#FFF" />
          <Text style={styles.scoreText}>{pontos} XP</Text>
        </View>
        <Text style={styles.levelText}>Nível: Protetor Iniciante</Text>
      </View>

      <FlatList
        data={listaCompleta}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#10B981',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: '#ECFDF5',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  scoreText: {
    color: '#FFF',
    fontSize: 42,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  levelText: {
    color: '#D1FAE5',
    fontSize: 14,
  },
  list: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardUser: {
    borderColor: '#10B981',
    borderWidth: 2,
    backgroundColor: '#F0FDF4',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748B',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  nomeUser: {
    color: '#059669',
  },
  pontos: {
    fontSize: 14,
    color: '#64748B',
  },
});