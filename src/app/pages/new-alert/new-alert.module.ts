import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewAlertRoutingModule } from './new-alert-routing.module';
import { NewAlertComponent } from './new-alert.component';

@NgModule({
  declarations: [NewAlertComponent],
  imports: [CommonModule, NewAlertRoutingModule],
})
export class NewAlertModule {}
