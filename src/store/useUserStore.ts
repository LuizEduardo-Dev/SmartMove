import { create } from 'zustand';

interface UserState {
  nome: string;
  email: string;
  idade: string;
  endereco: string;
  pontos: number;
  isLogado: boolean;
  theme: 'light' | 'dark';
  senha: string; 
  viagensFeitas: Record<string, number>;
  rotaAtual: {distancia: number; destinoNome: string} | null;
  setRotaAtual: (rota: {distancia: number; destinoNome: string} | null) => void;
  cadastrar: (nome: string, email: string, senha: string) => void;
  atualizarAnalytics: (idade: string, endereco: string) => void;
  adicionarPontosViagem: (destino: string, valor: number) => void;
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
  viagensFeitas: {},
  rotaAtual: null,
  setRotaAtual: (rota) => set({rotaAtual: rota}),
  
  cadastrar: (nome, email, senha) => set({ nome, email, senha, isLogado: true }),

  atualizarAnalytics: (idade, endereco) => set({idade, endereco}),
  
  adicionarPontosViagem: (destino, valor) => set((state) => ({ pontos: state.pontos + valor,
   viagensFeitas: { ...state.viagensFeitas, [destino]: Date.now()} 
   })),
  
  logout: () => set({ nome: '', email: '', idade: '', endereco: '', pontos: 0, isLogado: false, senha: '', viagensFeitas: {} }), // Limpa a senha ao deslogar

  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  atualizarSenha: (novaSenha) => set({ senha: novaSenha }), // Implementação da função de atualização de senha
}));