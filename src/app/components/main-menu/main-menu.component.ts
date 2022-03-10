import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatHomeItem } from 'src/app/models/cat-home-item';
import { CatHomeMngService } from 'src/app/services/cat-home-mng.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.less']
})
export class MainMenuComponent implements OnInit {

  menuItems: CatHomeItem[] = [];

  constructor(private router: Router, private catHomeMng: CatHomeMngService) {
    catHomeMng
      .catFromServ()
      .subscribe((cats: CatHomeItem[]) =>
        this.menuItems = cats
      );
  }

  ngOnInit(): void {
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
