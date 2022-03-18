import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { LabelMngService } from 'src/app/services/label-mng.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.less']
})
export class ThemeComponent implements OnInit {

  curentCat: Category | undefined;
  subThemes: Category[] | undefined;

  constructor(private _route: ActivatedRoute, private _catMng: CatsMngService, public lblMng: LabelMngService) {
    const id = this._route.snapshot.paramMap.get("id");

    if (!id) {
      return;
    }

    this._catMng.cat(id).subscribe(cat => this.curentCat = cat);
    this._catMng.catsChildren(id).subscribe(cats => this.subThemes = cats);
  }

  ngOnInit(): void {
  }

  public get route(): ActivatedRoute {
    return this._route;
  }

}
