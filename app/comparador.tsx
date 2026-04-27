import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Co2CalculatorService } from '../src/services/Co2CalculatorService';
import { CardTransporte } from '../src/components/CardTransporte';

export default function Comparador() {
  // Estado para armazenar a distância que o usuário digita. Começamos com 5km.
  const [distanciaInput, setDistanciaInput] = useState<string>('5');

  // useMemo: Um hook de performance do React. 
  // Ele só vai refazer o cálculo das rotas se o valor do input mudar.
  const rotas = useMemo(() => {
    // Converte o texto para número. Se o usuário apagar tudo, assume 0.
    const distancia = parseFloat(distanciaInput) || 0; 
    return Co2CalculatorService.gerarComparativoMock(distancia);
  }, [distanciaInput]);

  return (
    // KeyboardAvoidingView evita que o teclado do celular cubra o input
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Qual a distância do seu trajeto?</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={distanciaInput}
            onChangeText={setDistanciaInput}
            placeholder="Ex: 5.5"
            maxLength={4}
          />
          <Text style={styles.unidade}>Km</Text>
        </View>

        <Text style={styles.subtitulo}>Impacto estimado:</Text>

        {/* Renderizando a lista de cards baseada no array retornado pelo nosso Serviço */}
        {rotas.map((rota) => (
          <CardTransporte 
            key={rota.id} 
            rota={rota} 
            // Se for bike ou caminhada, damos aquele destaque sustentável visual
            isSustentavel={rota.modo === 'BICICLETA' || rota.modo === 'CAMINHADA'} 
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