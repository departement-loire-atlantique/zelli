import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleASE, LiensUtils } from 'src/app/models/jcms/articleASE';
import { JcmsClientService } from 'src/app/services/jcms-client.service';

import { Item } from '@/app/components/list/list.component';
import { ContactFromApi, mapContactFromApi } from '@/app/models/jcms/contact';
import { FaqEntry } from '@/app/models/jcms/faqEntry';
import { LabelMngService } from '@/app/services/label-mng.service';

@Component({
  selector: 'app-article-ase',
  templateUrl: './article-ase.component.html',
  styleUrls: ['./article-ase.component.less'],
})
export class ArticleASEComponent implements OnInit {
  article: ArticleASE | undefined;

  liensUtils: LiensUtils | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _jcms: JcmsClientService,
    public lblMng: LabelMngService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._jcms
        .get<ArticleASE>('data/' + id)
        .subscribe((article: ArticleASE) => {
          this.article = article;
          this.getAllContent();
        });
    });
  }

  private getAllContent(): any {
    if (this.article) {
      // Mot compliqués
      if (this.article.motsCompliques) {
        for (let i = 0; i < this.article.motsCompliques.length; i++) {
          this._jcms
            .get<FaqEntry>('data/' + this.article.motsCompliques[i].id)
            .subscribe((faqEntry: any) => {
              if (this.article && this.article.motsCompliques) {
                this.article.motsCompliques[i] = faqEntry;
              }
            });
        }
      }

      // liens utils
      this.liensUtils = new LiensUtils(
        this.article.liensInternes,
        this.article.liensExternes,
        this.article.libelleLien
      );
    }
  }

  getMotCompliquesTitle(): string[] | undefined {
    return this.article?.motsCompliques?.map(
      (itFaqEntry: FaqEntry) => itFaqEntry.title
    );
  }

  getMotCompliquesVar(): string[] | undefined {
    return this.article?.motsCompliques?.map(
      (itFaqEntry: FaqEntry) => itFaqEntry.answer
    );
  }

  public getItemForLiensUtiles(): Item[] {
    let item: Item[] = [];
    if (this.liensUtils) {
      for (let itLien of this.liensUtils.liens) {
        item.push({
          lbl: itLien.lbl,
          url: itLien.url,
        });
      }
    }
    return item;
  }

  getContactsForListDisplay(contacts: Pick<ContactFromApi, 'id'>[]) {
    return contacts.map((contact) => contact.id);
  }
}
