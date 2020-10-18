export class Usuario {
    public id : number;
    public nombre: string;
    public usuario: string;
    public dni: number;
    public clave: string;
    public telefono: number;
    public email: string;
      
    constructor(...args: []) { this.id = args['id']; this.nombre = args['nombre']; }
}
