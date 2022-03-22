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
    const id = this._route.snapshot.paramMap.get("id");

    if (!id) {
      return;
    }

    this._jcms.get<ArticleASE>("data/" + id).subscribe((article: ArticleASE) => this.article = article);
  }

  ngOnInit(): void {
  }

}
