import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Co2CalculatorService } from '../src/services/Co2CalculatorService';
import { CardTransporte } from '../src/components/CardTransporte';
import { ResumoRota } from '../src/types'; 
import { useUserStore } from '../src/store/useUserStore';
import { lightTheme, darkTheme } from '../src/store/Colors';

export default function ComparadorScreen() {
  const { distancia, destinoNome } = useLocalSearchParams();
  const router = useRouter();
  const { adicionarPontosViagem, viagensFeitas, theme } = useUserStore();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  const TEMPO_COOLDOWN_MS = 2 * 60 * 1000;

  const temRotaSelecionada = !!distancia;

  const rotas = useMemo(() => {
    if (!temRotaSelecionada) return [];
    return Co2CalculatorService.gerarComparativoMock(Number(distancia));
  }, [distancia, temRotaSelecionada]);

  const handleEscolherRota = (rota: ResumoRota) => {
    if (rota.modo === 'CARRO') {
      Alert.alert(
        'Atenção!',
        'Esta rota tem alta emissão de CO2 e não gera pontos no ranking. Tem certeza?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: () => router.navigate('/') } 
        ]
      );
      return;
    }

    const ultimaVezQueFoiParaODestino = viagensFeitas[String(destinoNome)];
    if (ultimaVezQueFoiParaODestino && Date.now()) {
      const tempoFaltanteSegundos = Math.ceil((TEMPO_COOLDOWN_MS - (Date.now() - ultimaVezQueFoiParaODestino)))
      
      Alert.alert('Descanso Merecido!', 'Você acabou de registrar uma viagem para cá! Descanse por mais ${tempoFaltanteSegundos} segundos antes de ganhar XP nessa mesma rota.');
      return;
    }

    const pontosGanhos = (rota.modo === 'BICICLETA' || rota.modo === 'CAMINHADA') ? 100 : 50;
    adicionarPontosViagem(String(destinoNome), pontosGanhos);

    Alert.alert(
      'Missão Sustentável!',
      `Parabéns! Você economizou CO2 e ganhou ${pontosGanhos} XP!`,
      [
        { text: 'Ver Ranking', onPress: () => router.navigate('/ranking') }
      ]
    );
  };

  const styles = getStyles(colors);

  if (!temRotaSelecionada) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="map-search-outline" size={80} color="#CBD5E1" />
        <Text style={styles.emptyTitle}>Nenhum trajeto definido</Text>
        <Text style={styles.emptyText}>
          Para calcular o impacto ambiental, você precisa primeiro selecionar um destino no Mapa.
        </Text>
        <TouchableOpacity style={styles.emptyButton} onPress={() => router.navigate('/')}>
          <Text style={styles.emptyButtonText}>Ir para o Mapa</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scroll}>
      
      <View style={styles.resumoTrajetoCard}>
        <View style={styles.pontoRow}>
          <MaterialCommunityIcons name="map-marker" size={24} color="#475569" />
          <Text style={styles.pontoText}>Origem: FACENS - Campus Centro</Text>
        </View>
        <View style={styles.linhaConexao}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#CBD5E1" />
        </View>
        <View style={styles.pontoRow}>
          <MaterialCommunityIcons name="map-marker-check" size={24} color="#10B981" />
          <Text style={styles.pontoText}>Destino: {destinoNome}</Text>
        </View>
        <View style={styles.distanciaBadge}>
          <Text style={styles.distanciaBadgeText}>{distancia} Km no total</Text>
        </View>
      </View>

      <Text style={styles.subtitulo}>Escolha seu meio de transporte:</Text>

      {rotas.map((rota) => (
        <CardTransporte
          key={rota.id}
          rota={rota}
          isSustentavel={rota.modo === 'BICICLETA' || rota.modo === 'CAMINHADA' || rota.modo === 'ONIBUS'}
          colors={colors}
          onEscolher={handleEscolherRota} 
        />
      ))}

    </ScrollView>
  );
}

const getStyles = (colors: typeof lightTheme | typeof darkTheme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20 },
  
  // Estilos do Estado Vazio
  emptyContainer: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginTop: 16, marginBottom: 8 },
  emptyText: { fontSize: 16, color: colors.textMuted, textAlign: 'center', marginBottom: 24, lineHeight: 24 },
  emptyButton: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  emptyButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

  // Estilos do Card de Resumo do Trajeto
  resumoTrajetoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  pontoRow: { flexDirection: 'row', alignItems: 'center' },
  pontoText: { fontSize: 16, fontWeight: '600', color: colors.text, marginLeft: 8, flex: 1 },
  linhaConexao: { marginLeft: 0, marginVertical: 4 }, // Mantém alinhado visualmente com os ícones
  distanciaBadge: {
    marginTop: 16,
    alignSelf: 'flex-start',
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  distanciaBadgeText: { color: colors.textMuted, fontWeight: 'bold', fontSize: 14 },
  
  subtitulo: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 16 }
});