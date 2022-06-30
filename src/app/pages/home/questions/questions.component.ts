import { Component, Injector, OnInit } from '@angular/core';
import { JcmsClientService } from '@/app/services/jcms-client.service';

import { JcmsPager } from '@/app/core/jcmsPager';

import { Item } from '@/app/components/list/list.component';
import { Util } from '@/app/util';

import { APageHome } from '@/app/models/aPageHome';
import { Category } from '@/app/models/jcms/category';
import { Content } from '@/app/models/jcms/content';
import { ListeDeContenus } from '@/app/models/jcms/listeDeContenus';
import { FaqAccueil } from '@/app/models/jcms/faqAccueil';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.less'],
})
export class QuestionsComponent extends APageHome implements OnInit {

  listeDeContenus: ListeDeContenus | undefined;
  pager: JcmsPager<Content> | undefined;
  result: Item[] | undefined;

  researchRun: boolean = false;

  parentCategory = environment.catThemes; //  cat explorer par thème

  constructor(_injector: Injector,
    private _jcms: JcmsClientService) {
    super(_injector);
  }

  ngOnInit(): void {
    if (!this.curentCat) {
      return;
    }
    this.researchRun = true;
    this.initListeDeContenus();
  }

  /**
   * get la liste de contenus pour la page questions
   */
  private initListeDeContenus() {
    if (!this.curentCat) {
      return;
    }

    this._jcms
      .getPager<ListeDeContenus>('search', {
        params: {
          types: 'ListeDeContenus',
          exactType: true,
          exactCat: true,
          catMode: 'and',
          cids: this.curentCat.id,
          pageSize: 1,
        },
      }).subscribe((pager: JcmsPager<ListeDeContenus>) => {
        this.pager = pager;
        const contents = pager.dataInPage;
        if (contents[0] && contents[0].contenus) {
          let listFaq = this.getListFaq(contents[0].contenus);
          listFaq.subscribe(dataArray => {
            this.initFaqList(dataArray);
          });
        }
      });

    this.researchRun = false;
  }

  /**
   * initialise la liste de FAQ Accueil
   * @param contenus la liste de contenus
   */
  private initFaqList(contenus: FaqAccueil[]) {
    if (contenus) {
      for (let ind = 0; ind < contenus.length; ind++) {
        let faq = contenus[ind];

        // liste des catégories de la FAQ
        this.getListCategories(faq.categories).subscribe(dataArray => {
          for (let i = 0; i < dataArray.length; i++) {
            let idParent = JSON.parse(JSON.stringify(dataArray[i].parent))['id'];
            // ajoute si le parent est bien la cat parent
            if (idParent == this.parentCategory) {
              this.addItem(faq, ind, dataArray[i]);
              break;
            }
          }
        });
      }
    }
  }

  /**
   * Get la liste de faq avec toutes les infos
   * @param contenus la liste de contenus
   * @returns la liste des observables de FAQ Accueil
   */
  private getListFaq(contenus: Content[]) {
    let observables: Observable<FaqAccueil>[] = [];
    for (let contenu of contenus) {
      observables.push(this._jcms.get<FaqAccueil>('data/' + contenu.id));
    }
    return forkJoin(observables);
  }

  /**
   * Get la liste de categories avec toutes les infos
   * @param list liste de contenus
   * @returns liste d'observables de Category
   */
  private getListCategories(list: Content[]) {
    let observables: Observable<Category>[] = [];
    for (let cat of list) {
      observables.push(this._jcms.get<Category>('data/' + cat.id));
    }
    return forkJoin(observables);
  }

  /**
   * Get l'image de la catégorie
   * @param category la catégorie
   * @returns l'image si présente
   */
  public getImgCategory(category?: Category) {
    if (category && category.icon) {
      return category.icon;
    }
    return "";
  }

  /**
   * Ajoute une FAQ Accueil à la liste
   * @param faq la faq a ajouter
   * @param index son index (pour l'ordre)
   * @param catFaq et la catégorie de la FAQ (pour l'image)
   */
  private addItem(faq: FaqAccueil, index: number, catFaq?: Category) {
    if (!this.result) {
      this.result = [];
    }

    this.result.splice(index, 0, {
      img: environment.urlJcms + this.getImgCategory(catFaq),
      lbl: faq.title,
      url: Util.buildUrlCotent(faq),
    });
  }

  /**
   * Get la liste d'items
   * @returns la liste d'items
   */
  public getItems() {
    return this.result;
  }

}
