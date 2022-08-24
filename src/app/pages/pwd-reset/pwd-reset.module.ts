import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@/app/components/shared.module';

import { PwdResetRoutingModule } from './pwd-reset-routing.module';
import { PwdResetComponent } from './pwd-reset.component';

@NgModule({
  declarations: [PwdResetComponent],
  imports: [CommonModule, PwdResetRoutingModule, SharedModule, FormsModule],
})
export class PwdResetModule {}
