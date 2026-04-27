import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";


export default function HomeScreen() {

  const router = useRouter();

  const origin = {
    latitude: -23.4698,
    longitude: -47.4298,
  };

  const destination = {
    latitude: -23.4750,
    longitude: -47.4350,
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        showsUserLocation={true}
      >
        <Marker coordinate={origin} title='Origem' description='Campus' pinColor='#475569' />
        <Marker coordinate={destination} title='Destino' description='Trabalho' pinColor='#10B981' />

        <Polyline
          coordinates={[origin, destination]}
          strokeColor='#10B981'
          strokeWidth={4}
          lineDashPattern={[5, 5]}
        />

      </MapView>

      <View style={styles.overlayContainer}>
        <View style={styles.searchBox}>
          <MaterialCommunityIcons name='magnify' size={24} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Para onde vamos?"
            placeholderTextColor="#94A3B8"
          />
        </View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/comparador')}
        >
          <MaterialCommunityIcons name='leaf' size={24} color="#FFF" />
          <Text style={styles.actionButtonText}>Analisar Impacto Ambiental</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 20, // Fica na parte inferior, acima do menu (Bottom Tabs)
    left: 20,
    right: 20,
    gap: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    elevation: 4, // Sombra Android
    shadowColor: '#000', // Sombra iOS
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981', // Verde principal
    borderRadius: 12,
    height: 56,
    elevation: 4,
    shadowColor: '#10B981',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});