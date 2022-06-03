import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/components/shared.module';

import { AskQuestionRoutingComponent } from './ask-question-routing.module';
import { AskQuestionComponent } from './ask-question.component';

@NgModule({
  declarations: [AskQuestionComponent],
  imports: [CommonModule, AskQuestionRoutingComponent, SharedModule],
})
export class AskQuestionModule {}