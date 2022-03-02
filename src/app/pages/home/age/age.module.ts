import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgeRoutingModule } from './age-routing.module';
import { AgeComponent } from './age.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    AgeComponent
  ],
  imports: [
    CommonModule,
    AgeRoutingModule,
    SharedModule
  ]
})
export class AgeModule { }
