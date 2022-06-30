import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AskQuestionSendComponent } from './ask-question-send.component';

const routes: Routes = [{ path: '', component: AskQuestionSendComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskQuestionSendRoutingComponent {}
