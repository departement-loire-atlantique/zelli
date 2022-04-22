import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/components/shared.module';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents.component';

@NgModule({
  declarations: [DocumentsComponent],
  imports: [CommonModule, DocumentsRoutingModule, SharedModule],
})
export class DocumentsModule {}
