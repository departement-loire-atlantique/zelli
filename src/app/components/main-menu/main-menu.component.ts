import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '@/app/models/jcms/category';
import { CatsHomeMngService } from '@/app/services/cats-home-mng.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.less'],
})
export class MainMenuComponent {
  menuItems: Category[];

  constructor(
    private router: Router,
    private _catsHomeMng: CatsHomeMngService
  ) {
    this.menuItems = this._catsHomeMng.getCats();
  }

  /**
   *
   * @param routeUrl
   * @returns true if route is curent route
   */
  isActive(routeUrl: string): boolean {
    return this.router.url === routeUrl;
  }
}
