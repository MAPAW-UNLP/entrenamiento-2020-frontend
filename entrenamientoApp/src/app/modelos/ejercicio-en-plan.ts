import { TipoDeEjercicio } from './tipo-de-ejercicio';

export class EjercicioEnPlan {
    public id: number;
    public cant_series: number;
    public dificultad: string; 
    public equipamiento: string;
    public tipoDeEjercicio_ID: number;//TipoDeEjercicio;

    constructor(){}
}
