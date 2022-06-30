import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AskQuestionFormComponent } from './ask-question-form.component';

const routes: Routes = [{ path: '', component: AskQuestionFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskQuestionFormRoutingComponent {}
