import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { AltaPlanComponent } from './alta-plan/alta-plan.component';
//estilos
import { StyleFormSharedModule } from '../style-form-shared/style-form-shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper'; 

const routes: Routes = [
  {path: 'planes/alta-plan', component: AltaPlanComponent}
];

@NgModule({
  declarations: [
    AltaPlanComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StyleFormSharedModule,
    MatToolbarModule,
    MatStepperModule
  ],
  exports:[
    RouterModule
  ]
})
export class PlanModule { }
