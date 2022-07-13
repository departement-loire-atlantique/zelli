import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleASE } from 'src/app/models/jcms/articleASE';
import { JcmsClientService } from 'src/app/services/jcms-client.service';

import { Item } from '@/app/components/list/list.component';
import { Category } from '@/app/models/jcms/category';
import { ContactFromApi } from '@/app/models/jcms/contact';
import { FaqEntry } from '@/app/models/jcms/faqEntry';
import { Lien } from '@/app/models/jcms/lien';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { Util } from '@/app/util';

import { environment } from '@/environments/environment';

@Component({
  selector: 'app-article-ase',
  templateUrl: './article-ase.component.html',
  styleUrls: ['./article-ase.component.less'],
})
export class ArticleASEComponent implements OnInit {
  article: ArticleASE | undefined;
  color: string | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _jcms: JcmsClientService,
    private _catMng: CatsMngService,
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
      this.findColor();
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

  public findColor() {
    if (
      this.article &&
      this.article.categories &&
      this.article.categories.length > 0
    ) {
      this._jcms
        .get('plugins/zelli/themeColor/' + this.article.id)
        .subscribe((rep: any) => {
          this.color = rep.color;
        });
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

  public verifTitreDesc() {
    return (
      this.article &&
      this.article.titreDescription &&
      this.article.titreDescription.length > 0
    );
  }

  public verifLiensUtiles() {
    return (
      this.article &&
      this.article.liensUtiles &&
      this.article.liensUtiles.length > 0
    );
  }

  public verifMotCompliques() {
    return (
      this.article &&
      this.article.motsCompliques &&
      this.article.motsCompliques.length > 0
    );
  }

  public verifContact() {
    return (
      this.article &&
      this.article.fichesStructures &&
      this.article.fichesStructures.length > 0
    );
  }

  public getColor() {
    return this.color;
  }
}
