import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsByThemesComponent } from './questions-by-themes.component';

const routes: Routes = [{ path: '', component: QuestionsByThemesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsByThemesRoutingComponent {}
