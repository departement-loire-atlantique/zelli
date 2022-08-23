import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PwdResetRoutingModule } from './pwd-reset-routing.module';
import { PwdResetComponent } from './pwd-reset.component';

@NgModule({
  declarations: [PwdResetComponent],
  imports: [CommonModule, PwdResetRoutingModule],
})
export class PwdResetModule {}
