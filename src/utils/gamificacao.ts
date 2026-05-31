export interface NivelDefinicao {
  id: number;
  titulo: string;
  xpMinimo: number;
  icone: any;
  descricao: string;
}

export const TODOS_NIVEIS: NivelDefinicao[] = [
  { id: 1, titulo: 'Protetor Iniciante', xpMinimo: 0, icone: 'seedling', descricao: 'Dando os primeiros passos para um mundo mais limpo.' },
  { id: 2, titulo: 'Explorador Eco', xpMinimo: 100, icone: 'leaf', descricao: 'Já entende o impacto das suas escolhas diárias.' },
  { id: 3, titulo: 'Ciclista Urbano', xpMinimo: 300, icone: 'bike', descricao: 'O transporte alternativo já faz parte da sua rotina.' },
  { id: 4, titulo: 'Guardião do Clima', xpMinimo: 600, icone: 'earth', descricao: 'Um verdadeiro exemplo de mobilidade sustentável.' },
  { id: 5, titulo: 'Mestre da Sustentabilidade', xpMinimo: 1000, icone: 'tree', descricao: 'Lenda viva! Seu impacto positivo é imensurável.' },
];

export interface InfoProgresso {
  tituloAtual: string;
  xpAtual: number;
  xpProximoNivel: number | null;
  porcentagemProgresso: number;
}

export function calcularProgresso(xpUsuario: number): InfoProgresso{
 const nivelAtual = [...TODOS_NIVEIS].reverse().find(nivel => xpUsuario >= nivel.xpMinimo) || TODOS_NIVEIS[0]; 

 const indexAtual = TODOS_NIVEIS.findIndex(n => n.id === nivelAtual.id);
 const proximoNivel = TODOS_NIVEIS[indexAtual + 1];

 let porcentagem = 100;

 if (proximoNivel) {
  const xpNecessarioNoNivel = proximoNivel.xpMinimo - nivelAtual.xpMinimo;
  const xpGanhoNoNivel = xpUsuario - nivelAtual.xpMinimo;
  porcentagem = (xpGanhoNoNivel / xpNecessarioNoNivel) * 100;
 }

  return{
    tituloAtual: nivelAtual.titulo,
    xpAtual: xpUsuario,
    xpProximoNivel: proximoNivel ? proximoNivel.xpMinimo : null,
    porcentagemProgresso: Math.min(Math.max(porcentagem, 0), 100)
  };
}