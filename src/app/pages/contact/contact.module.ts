import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@/app/components/shared.module';
import { PageContactComponent } from '@/app/pages/contact/contact.component';
import { PageNotFoundComponent } from '@/app/pages/errors/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: ':contactId',
    component: PageContactComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
  declarations: [PageContactComponent],
  exports: [RouterModule],
})
export class ContactModule {}
