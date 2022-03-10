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

  private _homeUrl: string = "/themes";
  private _seeLoad: boolean;

  constructor(private router: Router) {

    // TODO get logoUrl

    this._seeLoad = JSON.parse(localStorage.getItem('_seeLoad') || "true");
  }

  ngOnInit(): void {

    if(this._seeLoad){
      setTimeout(() => {
        this._seeLoad = false;
        // localStorage.setItem('_seeLoad', JSON.stringify(this._seeLoad));
        
        //TODO écran d'introduction
        this.router.navigate([this._homeUrl]);
      }, 5000);
    }else {
      this.router.navigate([this._homeUrl]);
    }
  }

}
