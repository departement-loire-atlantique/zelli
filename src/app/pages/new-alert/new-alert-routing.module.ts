import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewAlertComponent } from './new-alert.component';

const routes: Routes = [{ path: '', component: NewAlertComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAlertRoutingModule {}
