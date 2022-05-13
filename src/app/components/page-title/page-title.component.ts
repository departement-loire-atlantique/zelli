import { Component, Input } from '@angular/core';

import { Category } from '@/app/models/jcms/category';
import { LoginService } from '@/app/services/login.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.less'],
})
export class PageTitleComponent {
  @Input()
  curentCat: Category | undefined;

  constructor(public login: LoginService) {}

  public getProfileImg(): string {
    if (this.login.isLogged && this.login.profil && this.login.profil.photo) {
      return this.login.profil.photo;
    }
    return 'assets/images/svg/icone-profil.svg';
  }
}
