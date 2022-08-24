import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PwdResetComponent } from './pwd-reset.component';

const routes: Routes = [{ path: '', component: PwdResetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PwdResetRoutingModule {}
