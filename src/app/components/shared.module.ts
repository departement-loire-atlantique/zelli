import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { PageTitleComponent } from './page-title/page-title.component';



@NgModule({
  declarations: [
    MainMenuComponent,
    LoaderComponent,
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainMenuComponent,
    LoaderComponent,
    PageTitleComponent
  ]
})
export class SharedModule { }
