import { Usuario } from './usuario';

export class Alumno extends Usuario {
    public historial_clinico: string;
    public categoria_plan: number;

    constructor(){super()}
}
