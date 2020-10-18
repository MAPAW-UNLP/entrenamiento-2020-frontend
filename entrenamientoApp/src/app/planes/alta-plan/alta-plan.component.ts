import { Component, OnInit } from '@angular/core';

import {Alumno} from 'src/app/modelos/alumno';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';


const ALUMNOS_DATA: Alumno[] = [
  {id: 1, nombre: 'Dolores Petrinski', usuario: 'Dolores', dni: 999, clave: '123', telefono: 123, email: 'dolores@mail.com', historial_clinico: 'Presenta dolores en la espalda y rodillas.', categoria_plan: 2},
  {id: 2, nombre: 'Rodolfo Suarez', usuario: 'Rodo', dni: 998, clave: '123', telefono: 23, email: 'rodo@mail.com', historial_clinico: 'Presenta fuertes dolores lumbares.', categoria_plan: 3},
  {id: 3, nombre: 'Martina Duran', usuario: 'Marti', dni: 997, clave: '123', telefono: 203, email: 'marti@mail.com', historial_clinico: 'Tiene baja presión y dolores en las muñecas.', categoria_plan: 2},
]

@Component({
  selector: 'app-alta-plan',
  templateUrl: './alta-plan.component.html',
  styleUrls: ['./alta-plan.component.css'],
  
  //pipes: [FillPipe]
})
export class AltaPlanComponent implements OnInit {

  alumnoFormGroup: FormGroup;
  sesionFormGroup: FormGroup;
  isEditable = true;  //permite retroceder la edicion anterior

  alumnos = ALUMNOS_DATA;
  bloques = [1];
  cant_bloques = 1;


  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.alumnoFormGroup = this._formBuilder.group({
      alumno_id: ['', Validators.required],
      objetivos: ['', Validators.required],
    });
    this.sesionFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      nombreBloque1: ['', Validators.required]
    });
  }

  getSesiones(): any{
    if(this.alumnoFormGroup.value['alumno_id'] != '')
      if(this.alumnos.find(alu => alu.id === this.alumnoFormGroup.value['alumno_id']).categoria_plan > 2)
        return [1 , 2, 3];
    return [1, 2];
  }

  addBloque() {
    this.cant_bloques++;
    //this.sesionFormGroup.add (nombreBloque2: ['', Validators.required]); 
    this.bloques.push(this.cant_bloques);
  }

  getBloquesInfo(){
    for (let index = 1; index < this.cant_bloques; index++) {
      console.log(JSON.stringify(this.sesionFormGroup.value['nombreBloque'+ index]));
      
    }
  }

  guardar(){
    console.log(JSON.stringify(this.alumnoFormGroup.value));
  }
}