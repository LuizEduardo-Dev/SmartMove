import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserStore } from '../src/store/useUserStore';


const cadastroSchema = z.object({
    nome: z.string().min(3, 'O nome precisa ter pelo menos 3 letras'),
    email: z.string().email('Digite um e-mail válido'),
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});


type CadastroData = z.infer<typeof cadastroSchema>;

export default function CadastroScreen() {

    const { cadastrar } = useUserStore();

    const { control, handleSubmit, formState: { errors } } = useForm<CadastroData>({
        resolver: zodResolver(cadastroSchema),
    });

    const onSubmit = (data: CadastroData) => {
        // Salva no Zustand
        cadastrar(data.nome, data.email);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="leaf" size={60} color="#10B981" />
                <Text style={styles.title}>SmartMove</Text>
                <Text style={styles.subtitle}>Junte-se à revolução da mobilidade sustentável.</Text>
            </View>

            <View style={styles.form}>
                {/* Campo Nome */}
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.nome && styles.inputError]}
                            placeholder="Seu nome completo"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

                {/* Campo E-mail */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="Seu melhor e-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                {/* Campo Senha */}
                <Controller
                    control={control}
                    name="senha"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, errors.senha && styles.inputError]}
                            placeholder="Crie uma senha"
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Começar Agora</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', padding: 24 },
    header: { alignItems: 'center', marginBottom: 40 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#1E293B', marginTop: 16 },
    subtitle: { fontSize: 16, color: '#64748B', textAlign: 'center', marginTop: 8 },
    form: { gap: 16 },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
    },
    inputError: { borderColor: '#EF4444' },
    errorText: { color: '#EF4444', fontSize: 12, marginTop: -12, marginLeft: 4 },
    button: {
        backgroundColor: '#10B981',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});