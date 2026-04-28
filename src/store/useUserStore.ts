import { create } from 'zustand';

interface UserState {
  nome: string;
  email: string;
  idade: string;
  endereco: string;
  pontos: number;
  isLogado: boolean;
  theme: 'light' | 'dark';
  senha: string; // Adicionado para armazenar a senha
  cadastrar: (nome: string, email: string, senha: string) => void;
  atualizarAnalytics: (idade: string, endereco: string) => void;
  adicionarPontos: (valor: number) => void;
  logout: () => void;
  toggleTheme: () => void;
  atualizarSenha: (novaSenha: string) => void; // Adicionado para permitir a atualização da senha
}

export const useUserStore = create<UserState>((set) => ({
  nome: '',
  email: '',
  idade: '',
  endereco: '',
  pontos: 0, // Começa zerado!
  isLogado: false,
  theme: 'light', // Tema padrão
  senha: '', // Estado inicial da senha
  
  cadastrar: (nome, email, senha) => set({ nome, email, senha, isLogado: true }),

  atualizarAnalytics: (idade, endereco) => set({idade, endereco}),
  
  adicionarPontos: (valor) => set((state) => ({ pontos: state.pontos + valor })),
  
  logout: () => set({ nome: '', email: '', idade: '', endereco: '', pontos: 0, isLogado: false, senha: '' }), // Limpa a senha ao deslogar

  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  atualizarSenha: (novaSenha) => set({ senha: novaSenha }), // Implementação da função de atualização de senha
}));