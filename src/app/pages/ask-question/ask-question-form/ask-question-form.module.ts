import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/components/shared.module';

import { AskQuestionFormRoutingComponent } from './ask-question-form-routing.module';
import { AskQuestionFormComponent } from './ask-question-form.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AskQuestionFormComponent],
  imports: [CommonModule, AskQuestionFormRoutingComponent, SharedModule, FormsModule],
})
export class AskQuestionFormModule {}