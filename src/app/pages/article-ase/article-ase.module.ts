import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleASERoutingModule } from './article-ase-routing.module';
import { ArticleASEComponent } from './article-ase.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    ArticleASEComponent
  ],
  imports: [
    CommonModule,
    ArticleASERoutingModule,
    SharedModule
  ]
})
export class ArticleASEModule { }
