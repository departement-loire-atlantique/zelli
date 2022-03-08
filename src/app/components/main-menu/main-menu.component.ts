import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainMenuItem } from 'src/app/models/main-menu-item';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.less']
})
export class MainMenuComponent implements OnInit {

  // TODO get in JCMS
  menuItems: MainMenuItem[] = [
    {
      lbl: "themes",
      icone: "icon-home",
      url: "/themes"
    },
    {
      lbl: "age",
      icone: "icon-option",
      url: "/age"
    },
    {
      lbl: "home",
      icone: "",
      url: "/"
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param routeUrl 
   * @returns true if route is curent route
   */
  isActive(routeUrl: string): boolean {
    return this.router.url === routeUrl ;
  }

}
