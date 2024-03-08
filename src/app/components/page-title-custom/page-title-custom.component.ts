import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Category } from '@/app/models/jcms/category';
import { Member } from '@/app/models/jcms/member';
import { AppConfigService } from '@/app/services/app-config.service';
import { LoginService } from '@/app/services/login.service';

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

  @Input()
  isProfile: boolean = true;

  @Input()
  title: string | undefined;

  profil: Member | undefined;
  profilObs: Subscription;

  constructor(
    public login: LoginService,
    private appConfigService: AppConfigService
  ) {
    this.profilObs = login.profil.subscribe((rep) => {
      this.profil = rep;
    });
  }

  ngOnDestroy(): void {
    this.profilObs.unsubscribe();
  }

  public getProfileImg(): string {
    if (this.login.isLogged && this.profil && this.profil.photo) {
      return this.appConfigService.config.urlJcms + this.profil.photo;
    }
    return 'assets/images/svg/icone-profil.svg';
  }

  public getTitle() {
    if (this.title) return this.title;
    return this.mainCat?.title;
  }
}
