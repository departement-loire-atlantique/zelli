import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatHomeMngService } from 'src/app/services/cat-home-mng.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.less']
})
export class PageTitleComponent implements OnInit {

  icon: string = "";
  titlePage: string = "";
  subTitle: string = "";

  constructor(private router: Router, private catHomeMng: CatHomeMngService) {
  }

  ngOnInit(): void {
    this.catHomeMng.catsHome.subscribe(_ => {
      let curentCat = this.catHomeMng.getCatFromUrl(this.router.url);

      if (curentCat) {
        this.titlePage = curentCat.title;
        this.icon = curentCat.icon;
        this.subTitle = curentCat.subTitle;
      } else {
        console.error("Route not found in catsHome");
      }
    });

  }

}
