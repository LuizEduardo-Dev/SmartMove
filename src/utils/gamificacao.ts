export interface NivelUsuario {
  titulo: string;
  proximoNivelXp: number | null; 
}

export function calcularNivel(xp: number): NivelUsuario {
  if (xp < 100) return { titulo: 'Protetor Iniciante', proximoNivelXp: 100 };
  if (xp < 300) return { titulo: 'Explorador Eco', proximoNivelXp: 300 };
  if (xp < 600) return { titulo: 'Ciclista Urbano', proximoNivelXp: 600 };
  if (xp < 1000) return { titulo: 'Guardião do Clima', proximoNivelXp: 1000 };
  return { titulo: 'Mestre da Sustentabilidade', proximoNivelXp: null };
}