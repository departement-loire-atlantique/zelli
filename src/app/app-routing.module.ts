import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'themes',
    loadChildren: () => import('./pages/home/explore-by-themes/explore-by-themes.module').then(m => m.ExploreByThemesModule)
  },
  {
    path: 'age',
    loadChildren: () => import('./pages/home/age/age.module').then(m => m.AgeModule)
  },
  {
    path: '',
    redirectTo: '/themes',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./pages/errors/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
