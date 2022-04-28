import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/components/shared.module';

import { AccountCreationRoutingModule } from './account-creation-routing.module';
import { AccountCreationComponent } from './account-creation.component';

@NgModule({
  declarations: [AccountCreationComponent],
  imports: [CommonModule, AccountCreationRoutingModule, SharedModule],
})
export class AccountCreationModule {}
