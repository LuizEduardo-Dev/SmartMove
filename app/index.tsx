import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LOCAIS_MOCK, LocalInteresse } from '../src/mocks/locais';

export default function HomeScreen() {
  const router = useRouter();
  
  const [busca, setBusca] = useState('');
  const [destino, setDestino] = useState<LocalInteresse | null>(null);

  const origin = LOCAIS_MOCK[0];

  const locaisFiltrados = LOCAIS_MOCK.filter(
    (local) => local.id !== origin.id && local.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleSelecionarDestino = (local: LocalInteresse) => {
    setDestino(local);
    setBusca(local.nome); 
    Keyboard.dismiss(); 
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.coordenadas.latitude,
          longitude: origin.coordenadas.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        <Marker coordinate={origin.coordenadas} title={origin.nome} pinColor="#475569" />
        
        {destino && (
          <>
            <Marker coordinate={destino.coordenadas} title={destino.nome} pinColor="#10B981" />
            <Polyline
              coordinates={[origin.coordenadas, destino.coordenadas]}
              strokeColor="#10B981"
              strokeWidth={4}
              lineDashPattern={[5, 5]}
            />
          </>
        )}
      </MapView>

      <View style={styles.overlayContainer}>

        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={24} color="#64748B" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Para onde vamos?" 
            placeholderTextColor="#94A3B8"
            value={busca}
            onChangeText={(texto) => {
              setBusca(texto);
              if (texto === '') setDestino(null); 
            }}
          />
        </View>


        {busca.length > 0 && !destino && (
          <FlatList
            data={locaisFiltrados}
            keyExtractor={(item) => item.id}
            style={styles.listaResultados}
            keyboardShouldPersistTaps="handled" 
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemResultado} onPress={() => handleSelecionarDestino(item)}>
                <MaterialCommunityIcons name="map-marker" size={20} color="#64748B" />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemEndereco}>{item.endereco}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}


        <TouchableOpacity 
          style={[styles.actionButton, !destino && styles.actionButtonDisabled]}
          disabled={!destino}
          onPress={() => {

            router.push({
              pathname: '/comparador',
              params: { distancia: destino?.distanciaSimuladaKm }
            });
          }}
        >
          <MaterialCommunityIcons name="leaf" size={24} color="#FFF" />
          <Text style={styles.actionButtonText}>Analisar Impacto Ambiental</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  overlayContainer: {
    position: 'absolute',
    top: 50,  
    left: 20,
    right: 20,
    gap: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  listaResultados: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    maxHeight: 200,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  itemResultado: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  itemInfo: { marginLeft: 12, flex: 1 },
  itemNome: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  itemEndereco: { fontSize: 14, color: '#64748B', marginTop: 2 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 12,
    height: 56,
    elevation: 4,
    marginTop: 'auto', // Joga o botão para baixo dependendo do tamanho da tela
  },
  actionButtonDisabled: {
    backgroundColor: '#94A3B8', 
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});