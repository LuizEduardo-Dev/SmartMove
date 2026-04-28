import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserStore } from '../src/store/useUserStore';
import { lightTheme, darkTheme } from '../src/store/Colors';
import { RANKING_MOCK, RankingItem } from '../src/mocks/ranking';
import { calcularNivel } from '../src/utils/gamificacao';


export default function RankingScreen() {
    const { nome, pontos, theme } = useUserStore();
    const colors = theme === 'light' ? lightTheme : darkTheme;
    const nivelInfo = calcularNivel(pontos);
    const listaCompleta: RankingItem[] = [
        ...RANKING_MOCK,
        { id: 'user-01', nome, pontos, isUser: true }
    ].sort((a, b) => b.pontos - a.pontos);

    const renderItem = ({ item, index }: { item: RankingItem; index: number }) => {
        const itemStyles = getStyles(colors);
        const isTop3 = index < 3;
        const medalColor = index === 0 ? '#FBBF24' : index === 1 ? '#94A3B8' : '#D97706';

        return (
            <View style={[itemStyles.card, item.isUser && itemStyles.cardUser]}>
                <View style={itemStyles.rankContainer}>
                    {isTop3 ? (
                        <MaterialCommunityIcons name="medal" size={28} color={medalColor} />
                    ) : (
                        <Text style={itemStyles.rankText}>{index + 1}º</Text>
                    )}
                </View>

                <Image
                    source={{ uri: item.avatar || `https://ui-avatars.com/api/?name=${item.nome}&background=10B981&color=fff` }}
                    style={itemStyles.avatar}
                />

                <View style={itemStyles.infoContainer}>
                    <Text style={[itemStyles.nome, item.isUser && itemStyles.nomeUser]}>
                        {item.nome} {item.isUser && '(Você)'}
                    </Text>
                    <Text style={itemStyles.pontos}>{item.pontos} XP</Text>
                </View>

                {item.isUser && (
                    <MaterialCommunityIcons name="star" size={24} color="#10B981" />
                )}
            </View>
        );
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Sua Pontuação</Text>
                <View style={styles.scoreBadge}>
                    <MaterialCommunityIcons name="leaf" size={24} color="#FFF" />
                    <Text style={styles.scoreText}>{pontos} XP</Text>
                </View>
                <Text style={styles.levelText}>Nível: {nivelInfo.titulo}</Text>
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

const getStyles = (colors: typeof lightTheme | typeof darkTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.primary,
        padding: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        color: '#ECFDF5', // Manter um verde claro para contraste
        fontSize: 16,
        fontWeight: '600',
    },
    scoreBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    scoreText: {
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    levelText: {
        color: '#D1FAE5', // Manter um verde claro para contraste
        fontSize: 14,
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
        elevation: 2,
        shadowColor: colors.text,
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    cardUser: {
        borderColor: colors.primary,
        borderWidth: 2,
        backgroundColor: colors.primaryBackground,
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
    },
    rankText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textMuted,
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
        color: colors.text,
    },
    nomeUser: {
        color: colors.primary,
    },
    pontos: {
        fontSize: 14,
        color: colors.textMuted,
    },
});