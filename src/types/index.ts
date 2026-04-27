export type ModoTransporte = 'CARRO' | 'ONIBUS' | 'BICICLETA' | 'CAMINHADA';

export interface ResumoRota {
    id: string;
    modo: ModoTransporte;
    tempoEstimadoMinutos: number;
    distanciaKm: number;
    emissaoCO2Gramas: number;
    custoEstimadoReais: number;
}