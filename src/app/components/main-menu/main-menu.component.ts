import { Component, OnInit } from '@angular/core';
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
      url: "/themes"
    },
    {
      lbl: "age",
      url: "/age"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
