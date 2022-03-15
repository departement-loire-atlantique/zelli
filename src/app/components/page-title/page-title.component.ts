import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatsHomeMngService } from 'src/app/services/cats-home-mng.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.less']
})
export class PageTitleComponent implements OnInit {

  icon: string = "";
  titlePage: string = "";
  subTitle: string = "";

  constructor(private _router: Router, private _catsHomeMng: CatsHomeMngService) {
  }

  ngOnInit(): void {
    let curentCat = this._catsHomeMng.getCatFromUrl(this._router.url);

    if (curentCat) {
      this.titlePage = curentCat.title;
      this.icon = curentCat.icon;
      this.subTitle = curentCat.subTitle;
    } else {
      console.error("Route not found in catsHome");
    }

  }

}
