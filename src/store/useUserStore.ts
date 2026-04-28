import { create } from 'zustand';

interface UserState {
  nome: string;
  email: string;
  idade: string;
  endereco: string;
  pontos: number;
  isLogado: boolean;
  theme: 'light' | 'dark';
  cadastrar: (nome: string, email: string) => void;
  atualizarAnalytics: (idade: string, endereco: string) => void;
  adicionarPontos: (valor: number) => void;
  logout: () => void;
  toggleTheme: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  nome: '',
  email: '',
  idade: '',
  endereco: '',
  pontos: 0, // Começa zerado!
  isLogado: false,
  theme: 'light', // Tema padrão
  
  cadastrar: (nome, email) => set({ nome, email, isLogado: true }),

  atualizarAnalytics: (idade, endereco) => set({idade, endereco}),
  
  adicionarPontos: (valor) => set((state) => ({ pontos: state.pontos + valor })),
  
  logout: () => set({ nome: '', email: '', idade: '', endereco: '', pontos: 0, isLogado: false }),

  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));