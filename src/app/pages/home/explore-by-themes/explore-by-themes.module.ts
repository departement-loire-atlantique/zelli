import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreByThemesRoutingModule } from './explore-by-themes-routing.module';
import { ExploreByThemesComponent } from './explore-by-themes.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    ExploreByThemesComponent
  ],
  imports: [
    CommonModule,
    ExploreByThemesRoutingModule,
    SharedModule
  ]
})
export class ExploreByThemesModule { }
