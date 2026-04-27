import {create} from 'zustand';

interface UserState {
nome: string;
pontos: number;
adicionarPontos: (valor: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
    nome: 'Luiz Eduardo',
    pontos: 150,
    adicionarPontos: (valor) => set((state) => ({pontos: state.pontos + valor}))
}));