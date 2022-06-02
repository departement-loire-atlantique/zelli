import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@/app/components/shared.module';
import { PageContactDetailsComponent } from '@/app/pages/contact/contact-details/contact-details.component';
import { PageNotFoundComponent } from '@/app/pages/errors/page-not-found/page-not-found.component';

import { ContactCreateComponent } from './contact-create/contact-create.component';

const routes: Routes = [
  {
    path: ':details/:contactId',
    component: PageContactDetailsComponent,
  },
  { path: 'create', component: ContactCreateComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [PageContactDetailsComponent, ContactCreateComponent],
  exports: [RouterModule],
})
export class ContactModule {}
