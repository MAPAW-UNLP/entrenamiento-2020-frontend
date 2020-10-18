import { Usuario } from './usuario';

export class Alumno extends Usuario {
    public historial_clinico: string;
    public categoria_plan: number;

    constructor(...args: []) { 
        super()
        super.id = args['id'];
        super.nombre = args['nombre'];
        
        this.historial_clinico = args['historial_clinico']; 
        this.categoria_plan = args['categoria_plan']; 
    }

}
