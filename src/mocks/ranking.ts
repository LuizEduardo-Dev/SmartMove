export interface RankingItem {
    id: string;
    nome: string;
    pontos: number;
    avatar?: string;
    isUser?: boolean;
}

export const RANKING_MOCK: RankingItem[] = [
    { id: '1', nome: 'Ana Silva', pontos: 2100, avatar: 'https://i.pravatar.cc/150?u=carlos' },
    { id: '2', nome: 'Carlos Oliveira', pontos: 2500, avatar: 'https://i.pravatar.cc/150?u=ana' },
    { id: '3', nome: 'Beatriz Santos', pontos: 1850, avatar: 'https://i.pravatar.cc/150?u=bea' },
    { id: '4', nome: 'Luiz Eduardo', pontos: 150, isUser: true },
];