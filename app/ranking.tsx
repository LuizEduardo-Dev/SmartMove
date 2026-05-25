import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserStore } from '../src/store/useUserStore';
import { lightTheme, darkTheme } from '../src/store/Colors';
import { RANKING_MOCK, RankingItem } from '../src/mocks/ranking';
import { calcularProgresso, TODOS_NIVEIS } from '../src/utils/gamificacao'; 

export default function RankingScreen() {
    const { nome, pontos, theme } = useUserStore();
    const colors = theme === 'light' ? lightTheme : darkTheme;
    const isDark = theme === 'dark';
    
    const infoProgresso = calcularProgresso(pontos);
    
    const [modalNiveisVisible, setModalNiveisVisible] = useState(false);

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
                    <MaterialCommunityIcons name="star" size={24} color={colors.primary} />
                )}
            </View>
        );
    };

    const styles = getStyles(colors);

    return (
        <View style={styles.container}>
            
            {/* CABEÇALHO DO RANKING */}
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <Text style={styles.headerTitle}>Sua Pontuação</Text>
                    <TouchableOpacity onPress={() => setModalNiveisVisible(true)} style={styles.helpButton}>
                        <MaterialCommunityIcons name="help-circle-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.scoreBadge}>
                    <MaterialCommunityIcons name="leaf" size={24} color="#FFF" />
                    <Text style={styles.scoreText}>{pontos} XP</Text>
                </View>
                
                <Text style={styles.levelText}>Nível: {infoProgresso.tituloAtual}</Text>

                {/* A BARRA DE PROGRESSO VISUAL */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${infoProgresso.porcentagemProgresso}%` }]} />
                    </View>
                    <Text style={styles.progressText}>
                        {infoProgresso.xpProximoNivel 
                            ? `Faltam ${infoProgresso.xpProximoNivel - pontos} XP para o próximo nível` 
                            : 'Nível Máximo Atingido!'}
                    </Text>
                </View>
            </View>

            <FlatList
                data={listaCompleta}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {/* MODAL: GUIA DE CONQUISTAS E NÍVEIS */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalNiveisVisible}
                onRequestClose={() => setModalNiveisVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Guia de Níveis</Text>
                            <TouchableOpacity onPress={() => setModalNiveisVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color={colors.textMuted} />
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={styles.modalSubtitle}>
                            Ganhe XP realizando viagens sustentáveis e suba de nível para mostrar seu compromisso com o planeta.
                        </Text>

                        {TODOS_NIVEIS.map((nivel) => {
                            const isNivelAlcancado = pontos >= nivel.xpMinimo;
                            return (
                                <View key={nivel.id} style={[styles.nivelRow, !isNivelAlcancado && styles.nivelPendente]}>
                                    <View style={[styles.nivelIconeContainer, isNivelAlcancado ? styles.iconeAlcancado : styles.iconePendente]}>
                                        <MaterialCommunityIcons 
                                            name={nivel.icone} 
                                            size={28} 
                                            color={isNivelAlcancado ? '#FFF' : colors.textMuted} 
                                        />
                                    </View>
                                    <View style={styles.nivelInfo}>
                                        <Text style={[styles.nivelTitulo, isNivelAlcancado && styles.textoDestaque]}>
                                            {nivel.titulo}
                                        </Text>
                                        <Text style={styles.nivelDescricao}>{nivel.descricao}</Text>
                                        <Text style={styles.nivelXpRequisito}>{nivel.xpMinimo} XP</Text>
                                    </View>
                                    {isNivelAlcancado && (
                                        <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary} style={styles.checkIcon} />
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const getStyles = (colors: typeof lightTheme | typeof darkTheme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
        backgroundColor: colors.primary,
        padding: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' },
    headerTitle: { color: '#ECFDF5', fontSize: 16, fontWeight: '600' },
    helpButton: { position: 'absolute', right: 0, padding: 4 },
    scoreBadge: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    scoreText: { color: '#FFFFFF', fontSize: 42, fontWeight: 'bold', marginLeft: 10 },
    levelText: { color: '#D1FAE5', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
    
    // Estilos da Barra de Progresso
    progressContainer: { width: '100%', alignItems: 'center', marginTop: 8 },
    progressBarBackground: { width: '100%', height: 8, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 4, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: '#FBBF24', borderRadius: 4 }, // Amarelo para destacar do verde
    progressText: { color: '#D1FAE5', fontSize: 12, marginTop: 8 },

    list: { padding: 20 },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 16, padding: 15, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
    cardUser: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primaryBackground },
    rankContainer: { width: 40, alignItems: 'center' },
    rankText: { fontSize: 16, fontWeight: 'bold', color: colors.textMuted },
    avatar: { width: 50, height: 50, borderRadius: 25, marginHorizontal: 15 },
    infoContainer: { flex: 1 },
    nome: { fontSize: 16, fontWeight: '600', color: colors.text },
    nomeUser: { color: colors.primary },
    pontos: { fontSize: 14, color: colors.textMuted },

    // Estilos do Modal de Níveis
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '85%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: colors.text },
    modalSubtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 24, lineHeight: 20 },
    
    nivelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    nivelPendente: { opacity: 0.6 }, // Deixa os níveis futuros meio apagados
    nivelIconeContainer: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    iconeAlcancado: { backgroundColor: colors.primary },
    iconePendente: { backgroundColor: colors.inputBackground },
    nivelInfo: { flex: 1 },
    nivelTitulo: { fontSize: 16, fontWeight: 'bold', color: colors.text },
    textoDestaque: { color: colors.primary },
    nivelDescricao: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
    nivelXpRequisito: { fontSize: 12, fontWeight: 'bold', color: colors.textMuted, marginTop: 4 },
    checkIcon: { marginLeft: 8 },
});