import { ModoTransporte, ResumoRota } from "../types";

const FATORES_EMISSAO_POR_KM: Record<ModoTransporte,number> = {
    CARRO: 150,
    ONIBUS: 40,
    BICICLETA: 0,
    CAMINHADA: 0
};

export class Co2CalculatorService {

    static calcularEmissao(distanciaKm: number, modo: ModoTransporte): number {
        return distanciaKm * FATORES_EMISSAO_POR_KM[modo];
    }

    static gerarComparativoMock(distanciaKm: number): ResumoRota[]{

    return [
        {
            id: '1',
            modo:'CARRO',
            tempoEstimadoMinutos: Math.round(distanciaKm * 2),
            distanciaKm,
            emissaoCO2Gramas: this.calcularEmissao(distanciaKm, 'CARRO'),
            custoEstimadoReais: distanciaKm * 0.8,
        },
        {
            id: '2',
            modo:'ONIBUS',
            tempoEstimadoMinutos: Math.round(distanciaKm * 3.5),
            distanciaKm,
            emissaoCO2Gramas: this.calcularEmissao(distanciaKm, 'ONIBUS'),
            custoEstimadoReais: 5.00,
        },
        {
            id: '3',
            modo:'BICICLETA',
            tempoEstimadoMinutos: Math.round(distanciaKm * 4),
            distanciaKm,
            emissaoCO2Gramas: this.calcularEmissao(distanciaKm, 'BICICLETA'),
            custoEstimadoReais: 0,
        },
    ]
    }
}
