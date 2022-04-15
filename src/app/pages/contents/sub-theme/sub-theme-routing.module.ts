import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubThemeComponent } from './sub-theme.component';

const routes: Routes = [{ path: '', component: SubThemeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubThemeRoutingModule {}
