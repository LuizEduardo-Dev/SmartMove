import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Importe o router
import { Co2CalculatorService } from '../src/services/Co2CalculatorService';
import { CardTransporte } from '../src/components/CardTransporte';
import { ResumoRota } from '../src/types'; // Importe a interface
import { useUserStore } from '../src/store/useUserStore'; // Importe nosso estado global

export default function ComparadorScreen() {
  
  const params = useLocalSearchParams();
  const router = useRouter();
  const [distanciaInput, setDistanciaInput] = useState<string>(
    params.distancia ? String(params.distancia) : '5'
  );
  const { adicionarPontos } = useUserStore(); 

  const rotas = useMemo(() => {
    const distancia = parseFloat(distanciaInput) || 0;
    return Co2CalculatorService.gerarComparativoMock(distancia);
  }, [distanciaInput]);


  const handleEscolherRota = (rota: ResumoRota) => {
    if (rota.modo === 'CARRO') {

      Alert.alert(
        'Atenção!',
        'Esta rota tem alta emissão de CO2 e não gera pontos no ranking. Tem certeza?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: () => router.push('/') } // Finge que iniciou a viagem voltando pro mapa
        ]
      );
      return;
    }


    const pontosGanhos = (rota.modo === 'BICICLETA' || rota.modo === 'CAMINHADA') ? 100 : 50;


    adicionarPontos(pontosGanhos);

    Alert.alert(
      'Missão Sustentável!',
      `Parabéns pela escolha! Você economizou CO2 e ganhou ${pontosGanhos} XP!`,
      [
        { text: 'Ver Ranking', onPress: () => router.push('/ranking') }
      ]
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll}>


        {rotas.map((rota) => (
          <CardTransporte
            key={rota.id}
            rota={rota}
            isSustentavel={rota.modo === 'BICICLETA' || rota.modo === 'CAMINHADA' || rota.modo === 'ONIBUS'}
            onEscolher={handleEscolherRota} // Passamos a nossa função para o componente
          />
        ))}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: '#0F172A',
  },
  unidade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64748B',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 16,
  }
});