import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/components/shared.module';

import { AskQuestionSendRoutingComponent } from './ask-question-send-routing.module';
import { AskQuestionSendComponent } from './ask-question-send.component';

@NgModule({
  declarations: [AskQuestionSendComponent],
  imports: [CommonModule, AskQuestionSendRoutingComponent, SharedModule]
})
export class AskQuestionSendModule {}