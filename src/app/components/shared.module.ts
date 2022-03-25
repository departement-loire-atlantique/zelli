import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { BackComponent } from './back/back.component';
import { ThemeHeaderComponent } from './theme-header/theme-header.component';
import { HasHelpedComponent } from './has-helped/has-helped.component';
import { CarouselComponent } from './contents/carousel/carousel.component';
import { VideoComponent } from './contents/video/video.component';
import { CollapserComponent } from './collapser/collapser.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    LoaderComponent,
    PageTitleComponent,
    BackComponent,
    ThemeHeaderComponent,
    HasHelpedComponent,
    CarouselComponent,
    VideoComponent,
    CollapserComponent
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
    HasHelpedComponent,
    CarouselComponent,
    VideoComponent,
    CollapserComponent
  ]
})
export class SharedModule { }
