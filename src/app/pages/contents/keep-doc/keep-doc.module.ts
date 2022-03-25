import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeepDocRoutingModule } from './keep-doc-routing.module';
import { KeepDocComponent } from './keep-doc.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    KeepDocComponent
  ],
  imports: [
    CommonModule,
    KeepDocRoutingModule,
    SharedModule
  ]
})
export class KeepDocModule { }
