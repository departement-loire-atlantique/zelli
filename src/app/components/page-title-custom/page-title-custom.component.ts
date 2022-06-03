import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Category } from '@/app/models/jcms/category';
import { Member } from '@/app/models/jcms/member';
import { LoginService } from '@/app/services/login.service';

import { environment } from '@/environments/environment';

@Component({
  selector: 'app-page-title-custom',
  templateUrl: './page-title-custom.component.html',
  styleUrls: ['./page-title-custom.component.less'],
})
export class PageTitleCustomComponent implements OnDestroy {
  
  @Input()
  mainCat: Category | undefined;
  @Input()
  secondaryCat: Category | undefined;

  profil: Member | undefined;
  profilObs: Subscription;

  constructor(public login: LoginService) {
    this.profilObs = login.profil.subscribe((rep) => {
      this.profil = rep;
    });
  }

  ngOnDestroy(): void {
    this.profilObs.unsubscribe();
  }

  public getProfileImg(): string {
    if (this.login.isLogged && this.profil && this.profil.photo) {
      return environment.urlJcms + this.profil.photo;
    }
    return 'assets/images/svg/icone-profil.svg';
  }
}
