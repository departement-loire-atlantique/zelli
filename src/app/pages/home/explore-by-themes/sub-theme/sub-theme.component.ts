import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/jcms/category';
import { SubThemeASE } from 'src/app/models/jcms/sousThemeASE';
import { CatsMngService } from 'src/app/services/cats-mng.service';

@Component({
  selector: 'app-sub-theme',
  templateUrl: './sub-theme.component.html',
  styleUrls: ['./sub-theme.component.less']
})
export class SubThemeComponent implements OnInit {

  /**
   * Id de la catégorie theme principale
   */
  idCatTheme: string | null;
  catTheme: Category | undefined;

  /**
   * Id de la catégorie dans la quelle chercher le contenu Sous-thème ASE
   */
  idCatSubTheme: string | null;
  subTheme: SubThemeASE | undefined;

  constructor(private _route: ActivatedRoute, private _catMng: CatsMngService) {
    this.idCatTheme = this._route.snapshot.paramMap.get("id");
    if (this.idCatTheme) {
      this._catMng.cat(this.idCatTheme).subscribe(cat => this.catTheme = cat);
    }

    this.idCatSubTheme = this._route.snapshot.paramMap.get("subId");

    // TODO get subTheme with idCatSubTheme
    this.subTheme = {
      id: "id",
      title: "Todo titre",
      chapo: "Lorem ipsum dolor sit amet",
      contenu: [],
      affichagePageAAidee: true,
      navigation: this.catTheme // TODO
    };
  }

  ngOnInit(): void {
  }

}
