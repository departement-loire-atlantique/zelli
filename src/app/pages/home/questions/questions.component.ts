import { Component, Injector, OnInit } from '@angular/core';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { CatsMngService } from '@/app/services/cats-mng.service';

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
  askQuestionCat = environment.catAskQuestionForm;

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

  // get la liste de contenus pour la page questions
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

  // initialise la liste de FAQ Accueil
  private initFaqList(contenus: FaqAccueil[]) {
    if (contenus) {
      //for (let faq of contenus) {
        for (let ind = 0; ind < contenus.length; ind++) {
        let faq = contenus[ind];
        this.getListCategories(faq.categories).subscribe(dataArray => {
          for (let i = 0; i < dataArray.length; i++) {
            let idParent = JSON.parse(JSON.stringify(dataArray[i].parent))['id'];
            if (idParent == this.parentCategory) {
              this.addItem(faq, ind, dataArray[i]);
              break;
            }
          }
        });
      }
    }
  }

  // get liste faq avec toutes les infos
  private getListFaq(contenus: FaqAccueil[]) {
    let observables: Observable<FaqAccueil>[] = [];
    for (let contenu of contenus) {
      observables.push(this._jcms.get<FaqAccueil>('data/' + contenu.id));
    }
    return forkJoin(observables);
  }

  // get liste categories avec toutes les infos
  private getListCategories(list: Category[]) {
    let observables: Observable<Category>[] = [];
    for (let cat of list) {
      observables.push(this._jcms.get<Category>('data/' + cat.id));
    }
    return forkJoin(observables);
  }

  // get l'image de la catégorie
  public getImgCategory(category?: Category) {
    if (category && category.icon) {
      return category.icon;
    }
    return "";
  }

  // ajoute une faq accueil à la liste
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

  // retourne la liste d'items
  public getItems() {
    return this.result;
  }

  public getAskQuestionCat() {
    return this.askQuestionCat;
  }

}