import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/components/shared.module';
import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';

@NgModule({
  declarations: [
    ThemeComponent
  ],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    SharedModule
  ]
})
export class ThemeModule { }
