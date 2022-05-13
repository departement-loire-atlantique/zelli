import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@/app/components/shared.module';
import { PageContactDetailsComponent } from '@/app/pages/contact/contact-details/contact-details.component';
import { PageNotFoundComponent } from '@/app/pages/errors/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: ':contactId',
    component: PageContactDetailsComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
  declarations: [PageContactDetailsComponent],
  exports: [RouterModule],
})
export class ContactModule {}
