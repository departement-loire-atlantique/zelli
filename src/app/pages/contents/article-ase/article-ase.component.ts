import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleASE } from 'src/app/models/jcms/articleASE';
import { JcmsClientService } from 'src/app/services/jcms-client.service';

import { Item } from '@/app/components/list/list.component';
import { ContactFromApi } from '@/app/models/jcms/contact';
import { FaqEntry } from '@/app/models/jcms/faqEntry';
import { Lien } from '@/app/models/jcms/lien';
import { LabelMngService } from '@/app/services/label-mng.service';
import { Util } from '@/app/util';

@Component({
  selector: 'app-article-ase',
  templateUrl: './article-ase.component.html',
  styleUrls: ['./article-ase.component.less'],
})
export class ArticleASEComponent implements OnInit {
  article: ArticleASE | undefined;

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
      console.log(this.article.liensUtiles);
      if (this.article.liensUtiles) {
        for (let i = 0; i < this.article.liensUtiles.length; i++) {
          this._jcms
            .get<Lien>('data/' + this.article.liensUtiles[i].id)
            .subscribe((lien: any) => {
              if (this.article && this.article.liensUtiles) {
                this.article.liensUtiles[i] = lien;
              }
            });
        }
      }
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

  public getItemForLien(): Item[] {
    let item: Item[] = [];
    if (this.article && this.article.liensUtiles) {
      for (let itLien of this.article.liensUtiles) {
        item.push({
          lbl: itLien.texteAlternatif ? itLien.texteAlternatif : itLien.title,
          url: itLien.lienInterne
            ? Util.buildUrlCotent(itLien.lienInterne)
            : itLien.lienExterne,
        });
      }
    }
    return item;
  }

  getContactsForListDisplay(contacts: Pick<ContactFromApi, 'id'>[]) {
    return contacts.map((contact) => contact.id);
  }
}
