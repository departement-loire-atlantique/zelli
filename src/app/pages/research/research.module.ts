import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@/app/components/shared.module';

import { ResearchRoutingModule } from './research-routing.module';
import { ResearchComponent } from './research.component';

@NgModule({
  declarations: [ResearchComponent],
  imports: [CommonModule, ResearchRoutingModule, SharedModule, FormsModule],
})
export class ResearchModule {}
