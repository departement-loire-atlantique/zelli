import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { BackComponent } from './back/back.component';
import { ThemeHeaderComponent } from './theme-header/theme-header.component';
import { HasHelpedComponent } from './has-helped/has-helped.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    LoaderComponent,
    PageTitleComponent,
    BackComponent,
    ThemeHeaderComponent,
    HasHelpedComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainMenuComponent,
    LoaderComponent,
    PageTitleComponent,
    BackComponent,
    ThemeHeaderComponent,
    HasHelpedComponent
  ]
})
export class SharedModule { }
