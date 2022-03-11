import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatHomeMngService } from 'src/app/services/cat-home-mng.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  /**
   * url du logo
   */
  logoUrl: string = "assets/images/svg/logo-zelli.svg";

  /**
   * true if see splash screen
   */
  private _seeLoad: boolean;

  constructor(private router: Router) {

    // TODO get logoUrl

    this._seeLoad = JSON.parse(sessionStorage.getItem('_seeLoad') || "true");
  }

  ngOnInit(): void {

    if (this._seeLoad) {
      setTimeout(() => {
        this._seeLoad = false;
        sessionStorage.setItem('_seeLoad', JSON.stringify(this._seeLoad));

        //TODO écran d'introduction
        this.router.navigate(["/intro"]);
      }, 5000);
    } else {
      this.router.navigate(["/intro"]);
    }
  }

  public get seeLoad(): boolean {
    return this._seeLoad;
  }

}
