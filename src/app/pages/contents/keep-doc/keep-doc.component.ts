import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleASE } from 'src/app/models/jcms/articleASE';
import { Category } from 'src/app/models/jcms/category';
import { CatsMngService } from 'src/app/services/cats-mng.service';
import { JcmsClientService } from 'src/app/services/jcms-client.service';

@Component({
  selector: 'app-keep-doc',
  templateUrl: './keep-doc.component.html',
  styleUrls: ['./keep-doc.component.less']
})
export class KeepDocComponent implements OnInit {

  article: ArticleASE | undefined;
  catTheme: Category | undefined;

  constructor(private _route: ActivatedRoute, private _jcms: JcmsClientService, private _catMng: CatsMngService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const id = params.get("id");

      this._jcms.get<ArticleASE>("data/" + id).subscribe((article: ArticleASE) => {
        // TODO bug jalios
        article.navigation = (article as any).categories[0].id;

        this.article = article;

        if (this.article.navigation) {
          this._catMng.cat(this.article.navigation).subscribe((cat: Category) => this.catTheme = cat);
        }
      });

    });
  }

}
