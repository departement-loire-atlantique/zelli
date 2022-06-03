import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/components/shared.module';

import { QuestionsByThemesRoutingComponent } from './questions-by-themes-routing.module';
import { QuestionsByThemesComponent } from './questions-by-themes.component';

@NgModule({
  declarations: [QuestionsByThemesComponent],
  imports: [CommonModule, QuestionsByThemesRoutingComponent, SharedModule],
})
export class QuestionsByThemesModule {}