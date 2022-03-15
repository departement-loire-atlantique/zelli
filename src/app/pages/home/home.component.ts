import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CatsHomeMngService } from 'src/app/services/cats-home-mng.service';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  /**
   * true if app is init
   */
  private _appInit: boolean = false;

  /**
   * url du logo
   */
  logoUrl: string = "assets/images/svg/logo-zelli.svg";


  constructor(private _router: Router, private _catMng: CatsMngService, private _catHomeMng: CatsHomeMngService) {

    // TODO get logoUrl
    this._appInit = JSON.parse(sessionStorage.getItem('_appInit') || "false");
  }

  ngOnInit(): void {

    if (!this._appInit) {
      // init
      const catsHom: Observable<Category[]> = this._catMng.catsChildren(environment.catNavMain);

      setTimeout(() => {
        catsHom.subscribe((cats: Category[]) => {

          this._catHomeMng.setAllCats(cats);

          // end init
          this._appInit = true;
          sessionStorage.setItem('_appInit', JSON.stringify(this._appInit));

          // redirect
          this._router.navigate(["/intro"]);
        });
      }, 5000);
    } else {
      this._router.navigate(["/intro"]);
    }
  }

  public get appInit(): boolean {
    return this._appInit;
  }

}
