import React from "react";
import { StyleSheet } from "react-native";
import { ModoTransporte, ResumoRota } from "../types";
import { Text, View, TouchableOpacity, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { lightTheme, darkTheme } from "../store/Colors";


interface Props {
    rota: ResumoRota;
    isSustentavel?: boolean;
    onEscolher: (rota: ResumoRota) => void;
    colors: typeof lightTheme | typeof darkTheme;
}

export function CardTransporte({ rota, isSustentavel, onEscolher, colors }: Props) {

    const styles = getStyles(colors, rota, isSustentavel);
    
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
        <View style={styles.card}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name={getIcone(rota.modo)}
                    size={32}
                    color={isSustentavel ? colors.primary : colors.textMuted}
                />
                <Text style={styles.titulo} >{rota.modo}</Text>
            </View>

            <View>
                <MaterialCommunityIcons name="clock-outline" size={20} color={colors.textMuted} />
                <Text style={styles.textoInfo}>{rota.tempoEstimadoMinutos} min</Text>
            </View>

            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="molecule-co2" size={20} color={rota.emissaoCO2Gramas === 0 ? colors.primary : colors.danger} />
                <Text style={styles.textoEmissao}>
                    {rota.emissaoCO2Gramas === 0 ? 'Zero Emissão!' : `${rota.emissaoCO2Gramas}g emitidos`}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="cash" size={20} color={colors.textMuted} />
                <Text style={styles.textoInfo}>
                    {rota.custoEstimadoReais === 0 ? 'Grátis' : `R$ ${rota.custoEstimadoReais.toFixed(2)}`}
                </Text>
            </View>

            {onEscolher && (
                <TouchableOpacity
                    style={styles.botaoEscolher}
                    onPress={() => onEscolher(rota)}
                >
                    <Text style={styles.textoBotao}>
                        {isSustentavel ? 'Escolher e Ganhar XP' : 'Selecionar Trajeto'}
                    </Text>
                </TouchableOpacity>
            )}

        </View>


    );
}

const getStyles = (
    colors: typeof lightTheme | typeof darkTheme,
    rota: ResumoRota,
    isSustentavel?: boolean
) => StyleSheet.create({
    card: {
        backgroundColor: isSustentavel ? colors.primaryBackground : colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: isSustentavel ? colors.primary : colors.border,
        elevation: 2, // Sombra no Android
        shadowColor: colors.text, // Sombra no iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    } as ViewStyle,
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 8,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: colors.text,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    textoInfo: {
        fontSize: 16,
        marginLeft: 8,
        color: colors.textMuted,
    },
    textoEmissao: {
        fontSize: 16,
        marginLeft: 8,
        color: rota.emissaoCO2Gramas === 0 ? colors.primary : colors.textMuted,
        fontWeight: rota.emissaoCO2Gramas === 0 ? 'bold' : 'normal',
    },
    botaoEscolher: {
        marginTop: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: isSustentavel ? colors.primary : colors.textMuted,
    } as ViewStyle,
    textoBotao: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});