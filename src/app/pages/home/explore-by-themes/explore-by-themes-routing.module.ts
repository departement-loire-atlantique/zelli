import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreByThemesComponent } from './explore-by-themes.component';

const routes: Routes = [{ path: '', component: ExploreByThemesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreByThemesRoutingModule { }
