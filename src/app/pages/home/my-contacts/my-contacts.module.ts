import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/components/shared.module';

import { MyContactsRoutingModule } from './my-contacts-routing.module';
import { MyContactsComponent } from './my-contacts.component';

@NgModule({
  declarations: [MyContactsComponent],
  imports: [CommonModule, MyContactsRoutingModule, SharedModule],
})
export class MyContactsModule {}
