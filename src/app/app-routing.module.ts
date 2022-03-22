import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'themes',
    loadChildren: () => import('./pages/home/explore-by-themes/explore-by-themes.module').then(m => m.ExploreByThemesModule)
  },
  {
    path: 'theme/:id',
    loadChildren: () => import('./pages/home/explore-by-themes/theme/theme.module').then(m => m.ThemeModule)
  },
  {
    path: 'theme/:id/:subId',
    loadChildren: () => import('./pages/home/explore-by-themes/sub-theme/sub-theme.module').then(m => m.SubThemeModule)
  },
  {
    path: 'age',
    loadChildren: () => import('./pages/home/age/age.module').then(m => m.AgeModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroModule)
  },
  {
    path: 'article/:id',
    loadChildren: () => import('./pages/article-ase/article-ase.module').then(m => m.ArticleASEModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/errors/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
