import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: 'themes',
    loadChildren: () =>
      import('./pages/home/explore-by-themes/explore-by-themes.module').then(
        (m) => m.ExploreByThemesModule
      ),
  },
  {
    path: 'theme/:id',
    loadChildren: () =>
      import('./pages/home/explore-by-themes/theme/theme.module').then(
        (m) => m.ThemeModule
      ),
  },
  {
    path: 'subTheme/:id',
    loadChildren: () =>
      import('./pages/contents/sub-theme/sub-theme.module').then(
        (m) => m.SubThemeModule
      ),
    data: { isIdCat: false },
  },
  {
    path: 'subTheme/fromCat/:id',
    loadChildren: () =>
      import('./pages/contents/sub-theme/sub-theme.module').then(
        (m) => m.SubThemeModule
      ),
    data: { isIdCat: true },
  },
  {
    path: 'age',
    loadChildren: () =>
      import('./pages/home/age/age.module').then((m) => m.AgeModule),
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./pages/intro/intro.module').then((m) => m.IntroModule),
  },
  {
    path: 'article/:id',
    loadChildren: () =>
      import('./pages/contents/article-ase/article-ase.module').then(
        (m) => m.ArticleASEModule
      ),
  },
  {
    path: 'keepDoc/:id',
    loadChildren: () =>
      import('./pages/contents/keep-doc/keep-doc.module').then(
        (m) => m.KeepDocModule
      ),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'research',
    loadChildren: () =>
      import('./pages/research/research.module').then((m) => m.ResearchModule),
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('./pages/home/documents/documents.module').then(
        (m) => m.DocumentsModule
      ),
  },
  {
    path: 'mycontacts',
    loadChildren: () =>
      import('./pages/home/my-contacts/my-contacts.module').then(
        (m) => m.MyContactsModule
      ),
  },
  {
    path: 'questions',
    loadChildren: () =>
      import('./pages/home/questions/questions.module').then(
        (m) => m.QuestionsModule
      ),
  },
  {
    path: 'questions/:id',
    loadChildren: () =>
      import('./pages/home/questions/questions-by-themes/questions-by-themes.module').then(
        (m) => m.QuestionsByThemesModule
      ),
  },
  {
    path: 'ask-questions/:id',
    loadChildren: () =>
      import('./pages/ask-question/ask-question.module').then(
        (m) => m.AskQuestionModule
      ),
  }, 
  {
    path: 'ask-questions-form/:bool',
    loadChildren: () =>
      import('./pages/ask-question/ask-question-form/ask-question-form.module').then(
        (m) => m.AskQuestionFormModule
      ),
  },
  {
    path: 'ask-questions-send',
    loadChildren: () =>
      import('./pages/ask-question/ask-question-send/ask-question-send.module').then(
        (m) => m.AskQuestionSendModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'account/create',
    loadChildren: () =>
      import('./pages/account/account-creation/account-creation.module').then(
        (m) => m.AccountCreationModule
      ),
  },
  {
    path: 'account/login',
    loadChildren: () =>
      import('./pages/account/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'newAlert',
    loadChildren: () =>
      import('./pages/new-alert/new-alert.module').then(
        (m) => m.NewAlertModule
      ),
  },
  {
    path: 'alert/:id',
    loadChildren: () =>
      import('./pages/new-alert/new-alert.module').then(
        (m) => m.NewAlertModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/errors/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
