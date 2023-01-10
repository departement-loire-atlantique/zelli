import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReponseComponent } from './reponse.component';

const routes: Routes = [{ path: '', component: ReponseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReponseRoutingModule {}
