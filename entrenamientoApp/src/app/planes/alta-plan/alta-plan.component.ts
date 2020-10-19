import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
//componentes
import {Alumno} from 'src/app/modelos/alumno';
import {Sesion} from 'src/app/modelos/sesion';



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
  sesiones: Sesion[] = [];
  sesionesForm = new FormArray([]);

  formPlan = new FormArray([]);

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.alumnoFormGroup = this._formBuilder.group({
      alumno_id: ['', Validators.required],
      objetivos: ['', Validators.required],
      sesiones: new FormArray([])
    
    });
    
    this.sesionFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      bloques: new FormArray([])
    });

    this.bloquesFormGroup.push(this._formBuilder.group({
      nombre: ['', Validators.required],
      ejerciciosEnPlan: new FormArray([])
    }));

    this.sesionesForm.push(this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      bloques: new FormArray([])
    }));
    this.sesionesForm.push(this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      bloques: new FormArray([])
    }));
      
    this.formPlan.push(this.alumnoFormGroup);
    this.formPlan.push(this.sesionesForm);
  }

  get sesionForm() { return this.sesionFormGroup.controls; }
  get bloquesFormGroup() { return this.sesionForm.bloques as FormArray; }

  get misSesiones() { return this.sesionesForm as FormArray;}

  getSesiones(): any{
    if(this.alumnoFormGroup.value['alumno_id'] != '')
      if(this.alumnos.find(alu => alu.id === this.alumnoFormGroup.value['alumno_id']).categoria_plan > 2){
        this.sesionesForm.push(this._formBuilder.group({
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required],
          bloques: new FormArray([])
        }));
        
        console.log('sesiones form len plan3: '+this.sesionesForm.length);
        return [1 , 2, 3];
      }
    console.log('sesiones form len plan2: '+this.sesionesForm.length);
    return [1, 2];
  }

  verInfoSesion(nro){
    //console.log('sesion '+i+' :'+ JSON.stringify(this.sesionFormGroup.value));
    this.sesiones.push(this.sesionFormGroup.value);
    console.log('sesion '+nro+' :'+ JSON.stringify(this.sesiones));
    console.log('len bloques antes: '+ this.bloquesFormGroup.length);
    //for (let i = this.bloquesFormGroup.length; i > 1; i--) {
      //this.bloquesFormGroup.removeAt(i);
      //this.bloquesFormGroup.removeAt(this.bloquesFormGroup.value.findIndex(i));
      this.bloquesFormGroup.removeAt(this.bloquesFormGroup.length - 1);
    //this.sesionFormGroup.controls['bloques'].reset(); //resetea los valores de la sesion previa
    //this.sesionFormGroup.reset()

    console.log('len bloques despues: '+ this.bloquesFormGroup.length);

  }

  verSesion(nro){
    console.log('sesion nro '+nro+' datos: '+JSON.stringify(this.sesionesForm.value));
  }

  addBloque() {
    //this.cant_bloques++;
    //this.sesionFormGroup.add (nombreBloque2: ['', Validators.required]); 
    //this.bloques.push(this.cant_bloques);

    this.bloquesFormGroup.push(this._formBuilder.group({
      nombre: ['', Validators.required],
      ejerciciosEnPlan: new FormArray([])
    }));
  }

  getBloquesInfo(){
    for (let index = 1; index < this.cant_bloques; index++) {
      console.log(JSON.stringify(this.sesionFormGroup.value['nombreBloque'+ index]));
      
    }
  }

  guardar(){
    console.log(JSON.stringify(this.alumnoFormGroup.value));
  }

  guardarDatos(){
    console.log(JSON.stringify(this.formPlan.value));

    console.log(JSON.stringify('sesiones: '+this.sesionesForm.value))
  }
}