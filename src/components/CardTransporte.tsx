import React from "react";
import { StyleSheet } from "react-native";
import { ModoTransporte, ResumoRota } from "../types";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface Props {
    rota: ResumoRota;
    isSustentavel?: boolean;
}

export function CardTransporte({ rota, isSustentavel }: Props) {

    const getIcone = (modo: ModoTransporte) => {
        switch (modo) {
            case 'CARRO': return 'car-hatchback';
            case 'ONIBUS': return 'bus';
            case 'BICICLETA': return 'bike';
            case 'CAMINHADA': return 'walk';
            default: return 'help-circle';
        }
    };

    return (
        <View style={[styles.card, isSustentavel && styles.cardDestaque]}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name={getIcone(rota.modo)}
                    size={32}
                    color={isSustentavel ? '#10B981' : '#475569'}
                />
                <Text style={styles.titulo} >{rota.modo}</Text>
            </View>

            <View>
                <MaterialCommunityIcons name="clock-outline" size={20} color="#64748B" />
                <Text style={styles.textoInfo}>{rota.tempoEstimadoMinutos} min</Text>
            </View>

            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="molecule-co2" size={20} color={rota.emissaoCO2Gramas === 0 ? '#10B981' : '#EF4444'} />
                <Text style={[styles.textoInfo, rota.emissaoCO2Gramas === 0 && styles.textoVerde]}>
                    {rota.emissaoCO2Gramas === 0 ? 'Zero Emissão!' : `${rota.emissaoCO2Gramas}g emitidos`}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="cash" size={20} color="#64748B" />
                <Text style={styles.textoInfo}>
                    {rota.custoEstimadoReais === 0 ? 'Grátis' : `R$ ${rota.custoEstimadoReais.toFixed(2)}`}
                </Text>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 2, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    cardDestaque: {
        borderColor: '#10B981',
        borderWidth: 2,
        backgroundColor: '#F0FDF4', // Fundo levemente verde
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        paddingBottom: 8,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#1E293B',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    textoInfo: {
        fontSize: 16,
        marginLeft: 8,
        color: '#475569',
    },
    textoVerde: {
        color: '#10B981',
        fontWeight: 'bold',
    }
});