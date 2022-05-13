import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@/app/components/shared.module';

import { NewAlertRoutingModule } from './new-alert-routing.module';
import { NewAlertComponent } from './new-alert.component';

@NgModule({
  declarations: [NewAlertComponent],
  imports: [CommonModule, NewAlertRoutingModule, SharedModule, FormsModule],
})
export class NewAlertModule {}
