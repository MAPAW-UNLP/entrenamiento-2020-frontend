import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Alumno} from 'src/app/modelos/alumno';
//import {Sesion} from 'src/app/modelos/sesion';



const ALUMNOS_DATA: Alumno[] = [
  {id: 1, nombre: 'Dolores Petrinski', usuario: 'Dolores', dni: 999, clave: '123', telefono: 123, email: 'dolores@mail.com', historial_clinico: 'Presenta dolores en la espalda y rodillas.', categoria_plan: 2},
  {id: 2, nombre: 'Rodolfo Suarez', usuario: 'Rodo', dni: 998, clave: '123', telefono: 23, email: 'rodo@mail.com', historial_clinico: 'Presenta fuertes dolores lumbares.', categoria_plan: 3},
  {id: 3, nombre: 'Martina Duran', usuario: 'Marti', dni: 997, clave: '123', telefono: 203, email: 'marti@mail.com', historial_clinico: 'Tiene baja presión y dolores en las muñecas.', categoria_plan: 2},
]

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent implements OnInit, AfterViewInit {
  
  alumnos = ALUMNOS_DATA;
  planFormGroup: FormGroup;
  sesionFormGroup: FormGroup;
  isEditable = true;  //permite retroceder la edicion anterior
  cantidad = 2;

  constructor(private _formBuilder: FormBuilder) {
    this.planFormGroup = this._formBuilder.group({
      alumno_id: ['', Validators.required],
      objetivos: ['', Validators.required],
      sesiones: this._formBuilder.array([])
    });
   }
  ngAfterViewInit(): void {
    this.planFormGroup.get('alumno_id').valueChanges.subscribe(  // antes valueChanges
      data => {
        var plan = this.getPlanAlumno(data);
        console.log('alu con id:'+data+' tiene plan: '+ plan);
        if(plan != 0){
          if ((plan == 3) && (this.cantidad == 2)){
            this.addSesionForm();
            this.cantidad++;
          }
          else{
            if ((plan == 2) && (this.cantidad == 3)){
              this.cantidad--;
              this.deleteSesionForm(this.cantidad);
            }
          }
        }
      }
    );

  }

  ngOnInit(): void {
    for (let i = 0; i < this.cantidad; i++) {
      this.addSesionForm();
      console.log('add sesion nro: '+ i);
    }
  }

  get sesiones(){ return this.planFormGroup.get('sesiones') as FormArray;}

  getSesionesControls(): any {
    if(this.planFormGroup.value['alumno_id'] != ''){
      if(this.alumnos.find(alu => alu.id === this.planFormGroup.value['alumno_id']).categoria_plan == 3){
        if (this.cantidad == 2) {
          console.log('plan 2 --> plan 3');
          this.cantidad++; 
          this.addSesionForm();
        }
        else{          console.log('plan 3 --> plan 3');      }
      }
      else{
        if (this.cantidad == 3) {
          console.log('plan 3 --> plan 2');
          this.cantidad--; 
          this.deleteSesionForm(this.cantidad);
        }
        else{
          console.log('plan 2 --> plan 2');
        }
      }
    }  
    return this.sesiones.controls;  
  }

  private getPlanAlumno(id: number): any{
    /*if(this.planFormGroup.value['alumno_id'] != '')
      return this.alumnos.find(alu => alu.id === id).categoria_plan;
    return 0;*/
    return this.alumnos.find(alu => alu.id === id).categoria_plan;
  }

  deleteSesionForm(index: number) {
    console.log('delete sesion nro: '+index);
    this.sesiones.removeAt(index);
  }

  addSesionForm(){
    console.log('add sesion nueva');
    this.sesiones.push(this.crearFormSesion());
  }

  crearFormSesion(): FormGroup{
    return this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      //bloques: new FormArray([])
    });
  }

  estaAlumno(){
    return ((this.planFormGroup.value['alumno_id'] != '') && (this.planFormGroup.value['objetivos'] != ''));
  }
  
  guardarDatos(){
    console.log('datos plan: '+ JSON.stringify(this.planFormGroup.value));
  }

}
