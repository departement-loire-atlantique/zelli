import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { SubThemeRoutingModule } from './sub-theme-routing.module';
import { SubThemeComponent } from './sub-theme.component';

@NgModule({
  declarations: [
    SubThemeComponent
  ],
  imports: [
    CommonModule,
    SubThemeRoutingModule,
    SharedModule
  ]
})
export class SubThemeModule { }
