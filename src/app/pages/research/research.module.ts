import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResearchRoutingModule } from './research-routing.module';
import { ResearchComponent } from './research.component';

@NgModule({
  declarations: [ResearchComponent],
  imports: [CommonModule, ResearchRoutingModule],
})
export class ResearchModule {}
