export interface RankingItem {
    id: string;
    nome: string;
    pontos: number;
    avatar?: string;
    isUser?: boolean;
}

export const RANKING_MOCK: RankingItem[] = [
  { id: '1', nome: 'Ana Silva', pontos: 2550, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', nome: 'Carlos Oliveira', pontos: 2100, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', nome: 'Beatriz Santos', pontos: 1850, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', nome: 'Ricardo Mendes', pontos: 1400, avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '5', nome: 'Juliana Costa', pontos: 950, avatar: 'https://i.pravatar.cc/150?u=4' },
];