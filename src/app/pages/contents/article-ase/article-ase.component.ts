import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleASE } from 'src/app/models/jcms/articleASE';
import { JcmsClientService } from 'src/app/services/jcms-client.service';

@Component({
  selector: 'app-article-ase',
  templateUrl: './article-ase.component.html',
  styleUrls: ['./article-ase.component.less']
})
export class ArticleASEComponent implements OnInit {

  article: ArticleASE | undefined;

  constructor(private _route: ActivatedRoute, private _jcms: JcmsClientService) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const id = params.get("id");
      this._jcms.get<ArticleASE>("data/" + id).subscribe((article: ArticleASE) => this.article = article);
    });
  }

}
