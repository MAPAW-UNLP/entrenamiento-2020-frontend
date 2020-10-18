import { Sesion } from './sesion';

export class PlanEntrenamiento {
    public id: number;
    public alumno_id: number;
    public objetivos: string;
    public sesiones: Sesion[];

    constructor(){}
}
