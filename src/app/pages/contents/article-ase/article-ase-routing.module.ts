import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleASEComponent } from './article-ase.component';

const routes: Routes = [{ path: '', component: ArticleASEComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleASERoutingModule { }
