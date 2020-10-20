import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { AltaPlanComponent } from './alta-plan/alta-plan.component';
//estilos
import { StyleFormSharedModule } from '../style-form-shared/style-form-shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { CrearPlanComponent } from './crear-plan/crear-plan.component'; 

const routes: Routes = [
  {path: 'planes/alta-plan', component: AltaPlanComponent},
  {path: 'planes/alta-plan-2', component: CrearPlanComponent}
];

@NgModule({
  declarations: [
    AltaPlanComponent,
    CrearPlanComponent
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
