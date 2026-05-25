import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform, Switch, Modal, LayoutAnimation, UIManager } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserStore } from '../src/store/useUserStore';
import { calcularProgresso } from '../src/utils/gamificacao';
import { lightTheme, darkTheme } from '../src/store/Colors';

export default function PerfilScreen() {
    const { nome, email, senha, pontos, idade, endereco, atualizarAnalytics, logout, theme, toggleTheme, atualizarSenha } = useUserStore();
    const nivelInfo = calcularProgresso(pontos);

    // Separa o endereço em cidade e UF para os inputs
    const [initialCidade, initialUf] = useMemo(() => {
        if (!endereco || !endereco.includes(',')) {
            return [endereco || '', '']; // Trata endereço vazio ou mal formatado
        }
        const parts = endereco.split(',');
        const cidade = parts[0].trim();
        const uf = parts.slice(1).join(',').trim();
        return [cidade, uf];
    }, [endereco]);

    const [inputIdade, setInputIdade] = useState(idade);
    const [inputCidade, setInputCidade] = useState(initialCidade);
    const [inputUf, setInputUf] = useState(initialUf);

    const [modalSenhaVisivel, setModalSenhaVisivel] = useState(false);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');

    // Verifica se houve alguma alteração nos dados para exibir o botão de salvar
    const hasChanges = useMemo(() =>
        inputIdade !== idade || inputCidade !== initialCidade || inputUf !== initialUf,
        [inputIdade, inputCidade, inputUf, idade, initialCidade, initialUf]
    );

    const handleSalvarDados = () => {
        const novoEndereco = `${inputCidade}, ${inputUf.toUpperCase()}`;
        atualizarAnalytics(inputIdade, novoEndereco);
        Alert.alert("Sucesso", "Seus dados foram atualizados!");
    };

    const handleTrocarSenha = () => {
        if (senhaAtual.length < 6 || novaSenha.length < 6) {
            Alert.alert('Erro', 'As senhas devem ter no mínimo 6 caracteres.');
            return;
        }

        if (senhaAtual !== senha) {
            Alert.alert('Atenção', 'As senhas não coincidem');
            return;
        }

        // Simula a requisição de troca de senha e atualiza o estado global
        atualizarSenha(novaSenha);
        Alert.alert('Sucesso', 'Sua senha foi alterada com sucesso!', [
            {
                text: 'OK',
                onPress: () => {
                    setModalSenhaVisivel(false);
                    setSenhaAtual('');
                    setNovaSenha('');
                }
            }
        ]);
    };

    const colors = theme === 'light' ? lightTheme : darkTheme;

    const isDark = theme === 'dark';
    const styles = getStyles(colors);

    // Animação para o botão de salvar aparecer/desaparecer
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    useEffect(() => {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    }, [])

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>{nome.charAt(0).toUpperCase()}</Text>
                    </View>
                    <Text style={styles.nome}>{nome}</Text>
                    <Text style={styles.nivel}>{nivelInfo.tituloAtual}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferências</Text>
                    <View style={styles.settingRow}>
                        <Text style={styles.label}>Modo Escuro</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: colors.primary }}
                            thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleTheme}
                            value={isDark}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados da Conta</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput style={[styles.input, styles.inputDisabled]} value={email} editable={false} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Idade</Text>
                        <TextInput
                            style={styles.input}
                            value={inputIdade}
                            onChangeText={setInputIdade}
                            keyboardType="numeric"
                            placeholder="Ex: 22"
                            placeholderTextColor={colors.textMuted}
                        />
                    </View>

                    <View style={styles.addressRow}>
                        <View style={styles.inputGroupFlex}>
                            <Text style={styles.label}>Cidade</Text>
                            <TextInput
                                style={styles.input}
                                value={inputCidade}
                                onChangeText={setInputCidade}
                                placeholder="Sua cidade"
                                placeholderTextColor={colors.textMuted}
                            />
                        </View>
                        <View style={styles.inputGroupFixed}>
                            <Text style={styles.label}>UF</Text>
                            <TextInput
                                style={styles.input}
                                value={inputUf}
                                onChangeText={setInputUf}
                                placeholder="SP"
                                placeholderTextColor={colors.textMuted}
                                maxLength={2}
                                autoCapitalize="characters"
                            />
                        </View>
                    </View>

                    {hasChanges && (
                        <TouchableOpacity style={styles.saveButton} onPress={handleSalvarDados}>
                            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setModalSenhaVisivel(true)}
                    >
                        <MaterialCommunityIcons name="lock-reset" size={24} color={colors.textMuted} />
                        <Text style={styles.actionButtonText}>Alterar Senha</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <MaterialCommunityIcons name="logout" size={24} color={colors.danger} />
                    <Text style={styles.logoutText}>Sair da Conta</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* MODAL DE TROCA DE SENHA */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalSenhaVisivel}
                onRequestClose={() => setModalSenhaVisivel(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Alterar Senha</Text>
                            <TouchableOpacity onPress={() => setModalSenhaVisivel(false)}>
                                <MaterialCommunityIcons name="close" size={24} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha Atual</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                placeholder="Sua senha atual"
                                value={senhaAtual}
                                onChangeText={setSenhaAtual}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nova Senha</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                placeholder="Mínimo de 6 caracteres"
                                value={novaSenha}
                                onChangeText={setNovaSenha}
                            />
                        </View>

                        <TouchableOpacity style={styles.modalConfirmButton} onPress={handleTrocarSenha}>
                            <Text style={styles.saveButtonText}>Confirmar Troca</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </KeyboardAvoidingView>
    );
}

// Função que retorna os estilos baseados nas cores do tema
const getStyles = (colors: typeof lightTheme | typeof darkTheme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { alignItems: 'center', padding: 30, backgroundColor: '#10B981', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    avatarText: { fontSize: 32, fontWeight: 'bold', color: '#10B981' },
    nome: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    nivel: { fontSize: 16, color: '#D1FAE5', marginTop: 4 },
    section: { padding: 20, backgroundColor: colors.card, marginTop: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 16 },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addressRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    inputGroupFlex: {
        flex: 1,
    },
    inputGroupFixed: {
        width: 80,
    },
    inputGroup: { marginBottom: 16 },
    label: { fontSize: 14, color: colors.textMuted, marginBottom: 8 },
    input: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 12,
        color: colors.text,
        fontSize: 16
    },
    inputDisabled: { backgroundColor: colors.inputBackground, color: colors.textMuted },
    saveButton: { backgroundColor: '#10B981', padding: 12, borderRadius: 8, alignItems: 'center' },
    saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    actionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
    actionButtonText: { fontSize: 16, color: colors.text, marginLeft: 12 },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        padding: 16,
        backgroundColor: colors.dangerBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.dangerBorder
    },
    logoutText: { fontSize: 16, fontWeight: 'bold', color: colors.danger, marginLeft: 8 },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.card, // <-- Modificado para respeitar o tema
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        minHeight: 300,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text, // <-- Modificado para respeitar o tema
    },
    modalConfirmButton: {
        backgroundColor: '#10B981',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    }
});