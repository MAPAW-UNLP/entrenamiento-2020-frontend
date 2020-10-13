import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  guardar(datos: NgForm){
    console.log(JSON.stringify(datos.value))
  }

  regresar(){
    console.log('salir')
  }

}
