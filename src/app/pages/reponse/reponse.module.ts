import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/components/shared.module';

import { ReponseRoutingModule } from './reponse-routing.module';
import { ReponseComponent } from './reponse.component';

@NgModule({
  declarations: [ReponseComponent],
  imports: [CommonModule, ReponseRoutingModule, SharedModule],
})
export class ReponseModule {}
