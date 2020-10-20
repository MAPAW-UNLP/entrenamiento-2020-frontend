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

  planFormGroup: FormGroup;
  sesionFormGroup: FormGroup;
  isEditable = true;  //permite retroceder la edicion anterior

  alumnos = ALUMNOS_DATA;
  bloques = [1];
  cant_bloques = 1;
  //sesiones: Sesion[] = [];
  ////sesionesForm = new FormArray([]);

  ////formPlan = new FormArray([]);
  cant = 0;

  constructor(private _formBuilder: FormBuilder) {
    this.planFormGroup = this._formBuilder.group({
      alumno_id: ['', Validators.required],
      objetivos: ['', Validators.required],
      sesiones: new FormArray([])
    });
    this.addSesion();
    this.addSesion();

  }

  ngOnInit() {
    /*this.planFormGroup = this._formBuilder.group({
      alumno_id: ['', Validators.required],
      objetivos: ['', Validators.required],
      sesiones: new FormArray([])
    });*/
    
    /*this.sesionFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      bloques: new FormArray([])
    });*/

    /*this.bloquesFormGroup.push(this._formBuilder.group({
      nombre: ['', Validators.required],
      ejerciciosEnPlan: new FormArray([])
    }));*/

    /*this.sesiones.push(this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      bloques: new FormArray([])
    }));
    this.sesiones.push(this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      bloques: new FormArray([])
    }));*/
    
    //this.formPlan.push(this.planFormGroup);
    //////this.formPlan.push(this.sesionesForm);
  }

  //get sesionForm() { return this.sesionFormGroup.controls; }
  //get bloquesFormGroup() { return this.sesionForm.bloques as FormArray; }

  //get sesiones() { return this.sesionesForm as FormArray;}

  get sesiones(){ return this.planFormGroup.get('sesiones') as FormArray;}

  ver(): any {
      console.log('se tiene cant sesiones creados: '+ (this.getCantSesiones()).length);
      return this.sesiones.controls;
  }
  addSesion() {
    const sesionNuevo = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      bloques: new FormArray([])
    });
    this.sesiones.push(sesionNuevo);
    console.log('guarde sesion nueva');
  }

  getSesion(i): any{
    console.log('se obtiene sesion nro: '+ i);
    //return (this.planFormGroup.get('sesiones')[i]);
    //return this.sesiones.at(i);
    var vector = this.planFormGroup.get('sesiones') as FormArray;
    return (vector.at(i));

  }

  misesion(): any{
    var sesion = this.getSesion(this.cant);
    this.cant++;
    console.log('cant: '+this.cant);
    return sesion;
  }

  get sesion(){
    console.log('cant sesion: '+this.cantS);
    return this.getSesion(this.cantS);
  }

  
  set cantS(nro : number) {
    this.cantS = nro;
  }
  

  actualizarSesiones(){
    if(this.planFormGroup.value['alumno_id'] != '')
      if(this.alumnos.find(alu => alu.id === this.planFormGroup.value['alumno_id']).categoria_plan > 2){
        this.sesiones.push(this._formBuilder.group({
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required],
          bloques: new FormArray([])
        }));
      }
    console.log('sesiones totales: '+ this.sesiones.length);
  }

  verSesionesActuales(): any{
    //(click)="actualizarSesiones()
    if(this.planFormGroup.value['alumno_id'] != '')
      if(this.alumnos.find(alu => alu.id === this.planFormGroup.value['alumno_id']).categoria_plan > 2){
        if(this.sesiones.length == 2)
          this.sesiones.push(this._formBuilder.group({
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required],
            bloques: new FormArray([])
          }));
      }
    console.log('sesiones totales: '+ this.sesiones.length);
    return this.sesiones.controls;
  }

  getCantSesiones(): any{
    if(this.planFormGroup.value['alumno_id'] != '')
      if(this.alumnos.find(alu => alu.id === this.planFormGroup.value['alumno_id']).categoria_plan > 2){
        /*this.sesiones.push(this._formBuilder.group({
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required],
          bloques: new FormArray([])
        }));
        */
       this.addSesion();
        return [1 , 2, 3];
      }
    return [1, 2];
  }

  getSesionForm(nro): any {
    console.log('se pide la sesion nro: '+nro);
    console.log(' con campos:'+JSON.stringify((this.sesiones.controls[nro - 1].value)));
    return this.sesiones.controls[nro - 1];
  }

  /*verInfoSesion(nro){
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

  }*/

  verSesion(nro){
    //console.log('sesion nro '+nro+' datos: '+JSON.stringify(this.sesionesForm.value));
  }

  addBloque() {
    //this.cant_bloques++;
    //this.sesionFormGroup.add (nombreBloque2: ['', Validators.required]); 
    //this.bloques.push(this.cant_bloques);

    /*this.bloquesFormGroup.push(this._formBuilder.group({
      nombre: ['', Validators.required],
      ejerciciosEnPlan: new FormArray([])
    }));*/
  }

  getBloquesInfo(){
    for (let index = 1; index < this.cant_bloques; index++) {
      console.log(JSON.stringify(this.sesionFormGroup.value['nombreBloque'+ index]));
      
    }
  }

  guardar(){
    console.log(JSON.stringify(this.planFormGroup.value));
  }

  guardarDatos(){
    //console.log(JSON.stringify(this.formPlan.value));

    ////console.log(JSON.stringify('sesiones: '+this.sesionesForm.value))
  }
}