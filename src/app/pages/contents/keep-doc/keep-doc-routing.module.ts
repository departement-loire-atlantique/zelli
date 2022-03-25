import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeepDocComponent } from './keep-doc.component';

const routes: Routes = [{ path: '', component: KeepDocComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeepDocRoutingModule { }
