import { ModoTransporte } from "../types";

export interface LocalInteresse {
    id: string;
    nome: string;
    endereco: string;
    coordenadas: {
        latitude: number;
        longitude: number;
    };
    distanciaSimuladaKm: number;
}


export const LOCAIS_MOCK: LocalInteresse[] = [

    {
        id: '1',
        nome: 'FACENS - Campus Centro',
        endereco: 'Rod. Sen. José Ermírio de Moraes, 1425',
        coordenadas: { latitude: -23.4698, longitude: -47.4298 },
        distanciaSimuladaKm: 0,
    },
    {
        id: '2',
        nome: 'Parque das Águas',
        endereco: 'Jardim Abaeté, Sorocaba',
        coordenadas: { latitude: -23.4750, longitude: -47.4350 },
        distanciaSimuladaKm: 4.2,
    },
    {
        id: '3',
        nome: 'Terminal Santo Antônio',
        endereco: 'Centro, Sorocaba',
        coordenadas: { latitude: -23.5002, longitude: -47.4589 },
        distanciaSimuladaKm: 7.5,
    },
    {
        id: '4',
        nome: 'Shopping Iguatemi Esplanada',
        endereco: 'Votocel, Sorocaba',
        coordenadas: { latitude: -23.5385, longitude: -47.4651 },
        distanciaSimuladaKm: 12.8,
    },
];