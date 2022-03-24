import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ArticleASE } from 'src/app/models/jcms/articleASE';
import { Category } from 'src/app/models/jcms/category';
import { Content } from 'src/app/models/jcms/content';
import { SubThemeASE } from 'src/app/models/jcms/sousThemeASE';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { JcmsClientService } from 'src/app/services/jcms-client.service';
import { environment } from 'src/environments/environment';

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

  constructor(private _route: ActivatedRoute, private _catMng: CatsMngService, private _jcms: JcmsClientService) {
    this.idCatTheme = this._route.snapshot.paramMap.get("id");
    if (this.idCatTheme) {
      this._catMng.cat(this.idCatTheme).subscribe(cat => this.catTheme = cat);
    }

    this.idCatSubTheme = this._route.snapshot.paramMap.get("subId");


    if (this.idCatSubTheme) {
      this._jcms.get("search", { params: { "types": "SousthemeASE", "exactCat": true, "cids": this.idCatSubTheme } })
        .pipe(
          map((rep: any): SubThemeASE[] => rep.dataSet)
        )
        .subscribe((rep: SubThemeASE[]) => {
          if (rep && rep.length > 0) {
            this.subTheme = rep[0];

            // get ful content
            for (let i = 0; i < this.subTheme.contenu.length; i++) {
              this._jcms.get("data/" + this.subTheme.contenu[i].id)
                .subscribe((fullContent: any) => {
                  if (this.subTheme) {
                    this.subTheme.contenu[i] = fullContent;
                  }
                });
            }
          }

        });
    }
  }

  ngOnInit(): void {
  }

  public getImgContent(content: Content): string | undefined {

    if (content.class === "generated.ArticleASE") {
      return environment.urlJcms + (content as ArticleASE).picto;
    }
    // TODO structures Lot 2
    return undefined;
  }

  public buildUrlCotent(content: Content): string {
    if (content.class === "generated.ArticleASE") {
      return "/article/" + content.id;
    }
    
    // TODO structures Lot 2
    if (content.class === "generated.Structure") {
      return "/TODO/" + content.id;
    }
    return "";
  }

}
