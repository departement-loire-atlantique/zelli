import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BackComponent } from '@/app/components/back/back.component';
import { CollapserComponent } from '@/app/components/collapser/collapser.component';
import { CarouselComponent } from '@/app/components/contents/carousel/carousel.component';
import { VideoComponent } from '@/app/components/contents/video/video.component';
import { HasHelpedComponent } from '@/app/components/has-helped/has-helped.component';
import { LoaderComponent } from '@/app/components/loader/loader.component';
import { MainMenuComponent } from '@/app/components/main-menu/main-menu.component';
import { PageTitleComponent } from '@/app/components/page-title/page-title.component';
import { ThemeHeaderComponent } from '@/app/components/theme-header/theme-header.component';

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
    CollapserComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    MainMenuComponent,
    LoaderComponent,
    PageTitleComponent,
    BackComponent,
    ThemeHeaderComponent,
    HasHelpedComponent,
    CarouselComponent,
    VideoComponent,
    CollapserComponent,
  ],
})
export class SharedModule {}
