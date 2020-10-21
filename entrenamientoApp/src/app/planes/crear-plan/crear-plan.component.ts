import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


import {Alumno} from 'src/app/modelos/alumno';
//import {Sesion} from 'src/app/modelos/sesion';
import {TipoDeEjercicio} from 'src/app/modelos/tipo-de-ejercicio';


const ALUMNOS_DATA: Alumno[] = [
  {id: 1, nombre: 'Dolores Petrinski', usuario: 'Dolores', dni: 999, clave: '123', telefono: 123, email: 'dolores@mail.com', historial_clinico: 'Presenta dolores en la espalda y rodillas.', categoria_plan: 2},
  {id: 2, nombre: 'Rodolfo Suarez', usuario: 'Rodo', dni: 998, clave: '123', telefono: 23, email: 'rodo@mail.com', historial_clinico: 'Presenta fuertes dolores lumbares.', categoria_plan: 3},
  {id: 3, nombre: 'Martina Duran', usuario: 'Marti', dni: 997, clave: '123', telefono: 203, email: 'marti@mail.com', historial_clinico: 'Tiene baja presión y dolores en las muñecas.', categoria_plan: 2},
]

const TIPOS_EJERCICIOS_DATA: TipoDeEjercicio[] = [
  {id: 1,nombre: 'Sentadilla', descripcion: 'Ejercicio básico y fundamental. Siempre y cuando no tengas molestias de rodilla o espalda, este ejercicio va a fortalecer mucho tus piernas y a mejorar tu postura. ',
    zona_muscular: 'Rodillas y espalda', video_demo: null, 
    tipo_repeticion: 'Veces', cantidad_x_serie: 15},
  {id: 2,nombre: 'Plancha boca arriba', descripcion: 'Este ejercicio de fuerza central debería realizarse en el piso boca arriba apoyando únicamente la zona lumbar. ',
    zona_muscular: 'Sección lumbar', video_demo: null, 
    tipo_repeticion: 'Segundos', cantidad_x_serie: 15},
  {id: 3,nombre: 'Estocada', descripcion: 'Ejercicio de fuerza de piernas y estabilidad del tronco. ',
    zona_muscular: 'Piernas', video_demo: null, 
    tipo_repeticion: 'Veces', cantidad_x_serie: 6}
]

const DIFICULTADES: string[]= [
  'BAJO', 'INTERMEDIO', 'ALTO'
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
  verInfoAlumno = false; 
  historial = "";

  tiposEjercicios = TIPOS_EJERCICIOS_DATA;
  nivelDificultad = DIFICULTADES;

  constructor(private _formBuilder: FormBuilder) {
    this.planFormGroup = this._formBuilder.group({
      alumno_id: ['', Validators.required],
      objetivos: ['', Validators.required],
      sesiones: this._formBuilder.array([])
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < this.cantidad; i++) {
      this.addSesionForm();
      console.log('add sesion nro: '+ i);
    }
  }

  ngAfterViewInit(): void {
    this.planFormGroup.get('alumno_id').valueChanges.subscribe(  
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
        this.addBloqueSesion();
        this.setHistorialAlumno(data);
        this.verInfoAlumno = true;
      }
    );
  }

  addBloqueSesion() {
    for (const sesion of this.sesiones.controls) {
      if((sesion.get('bloques') as FormArray).length == 0)
        this.addBloqueForm(sesion.get('bloques'));
    }
  }


  get sesiones(){ return this.planFormGroup.get('sesiones') as FormArray;}

  private getPlanAlumno(id: number): any{
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
      bloques: this._formBuilder.array([])
    });
  }

  estaParte1(){
    return ((this.planFormGroup.value['alumno_id'] != '') && (this.planFormGroup.value['objetivos'] != ''));
  }


  deleteBloqueForm(bloques, nroBloque){ //verificar
    console.log('delete bloque nro: '+nroBloque);
    bloques.removeAt(nroBloque);
  }

  addBloqueForm(bloques){
    console.log('add bloque nueva');
    bloques.push(this.crearFormBloque());
  }

  crearFormBloque(): FormGroup{
    return this._formBuilder.group({
      nombre: ['', Validators.required],
      ejercicios: this._formBuilder.array([])
    });
  }

  addEjercicioForm(ejercicios){
    console.log('add ejericicio nuevo');
    ejercicios.push(this.crearFormEjercicio());
  }

  crearFormEjercicio(): FormGroup{
    return this._formBuilder.group({
      cant_series: ['', Validators.required],
      dificultad: ['', Validators.required],
      equipamiento: ['', Validators.required],
      tipoDeEjercicio_id: ['', Validators.required]
    });
  }
    
  guardarDatos(){
    console.log('datos plan: '+ JSON.stringify(this.planFormGroup.value));
  }
  
  setHistorialAlumno(alumno_id): any{ 
    console.log('se busca alu id: '+alumno_id);
    this.historial = this.alumnos.find(alu => alu.id === alumno_id).historial_clinico;
  }

  getEjercicio(tipoDeEjercicio_id): TipoDeEjercicio{
    return this.tiposEjercicios.find(ejerc => ejerc.id === tipoDeEjercicio_id);
  }

  getDescEjerc(tipoDeEjercicio_id): any{
    return this.tiposEjercicios.find(ejerc => ejerc.id === tipoDeEjercicio_id).descripcion;
  }

}
