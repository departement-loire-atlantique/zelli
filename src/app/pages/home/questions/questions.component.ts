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


  parentCategory = "rzelli_1394659"; //  bas non dépend des env ??? find cat by name? 

  constructor(_injector: Injector,
    private _catMng: CatsMngService,
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
          cids: [this.curentCat.id],
          pageSize: 1,
        },
      }).subscribe((pager: JcmsPager<ListeDeContenus>) => {
        this.pager = pager;
        const contents = pager.dataInPage;
        this.initFaqList(contents[0]);
      });

    this.researchRun = false;
  }

  // initialise la liste de FAQ Accueil
  private initFaqList(liste: ListeDeContenus) {
    if(liste) {

      let listeFaq: FaqAccueil[] = this.getListFaq(liste.contenus);

      for (let faq of liste.contenus) {
        let listeCat = this.getFaqCategories(faq.categories);
        this.addItem(faq, listeCat);
      }
    }
  }

  // get liste faq avec toutes les infos
  private getListFaq(contenus: FaqAccueil[]) {
    let listeFaq: FaqAccueil[] = [];
    if(contenus) {
      for(let contenu of contenus) {
        this._jcms
        .get<FaqAccueil>('data/' + contenu.id)
        .subscribe((faq: FaqAccueil) => {
          listeFaq.push(faq); 
        });
      }
    }
    return listeFaq;
  }

  // get cat theme faq
  private getFaqCategories(list: Category[]): Category | undefined {
    let faqTheme = undefined;
    if(list) {
      for(let idCat of list) {
        this._jcms
        .get<Category>('data/' + idCat)
        .subscribe((cat: Category) => {
          if (cat.parent == this.parentCategory) {
            faqTheme = cat;
          }
        });
      }
    }
    return faqTheme;
    
  }

  // get l'image de la catégorie
  public getImgCategory(category?: Category) {
    if (category && category.image) {
      return category.image;
    }
    return "";
  }

  // ajoute une faq accueil à la liste
  private addItem(faq: FaqAccueil, catFaq?: Category) {
    if (!this.result) {
      this.result = [];
    }

    this.result.push({
      img: this.getImgCategory(catFaq),
      lbl: faq.title,
      url: Util.buildUrlCotent(faq),
    });
  }

  // retourne la liste d'items
  public getItems() {
    return this.result;
  }

}



// // get les catégories de la faq accueil
  // private getFaqCategories(faqId: string): Category[] {
  //   let listeCat: Category[] = [];
  //   this._jcms
  //     .get<FaqAccueil>('data/' + faqId)
  //     .subscribe((faqComplete: FaqAccueil) => {
  //       if (faqComplete?.categories) {
  //         for (let itCat of faqComplete.categories) {
  //           this._catMng.cat(itCat.id).subscribe((cat: Category) => {
  //             listeCat.push(cat);
  //             console.log(listeCat);
  //           });
  //         }
  //       }
  //     });
  //   return listeCat;
    
  // }

  // // get la catégorie du theme de la faq
  // private getFaqThemeCategory(categories: Category[]): Category | undefined {
  //   for(let cat of categories) {
  //     if (cat.parent == this.parentCategory) {
  //       return cat;
  //     }
  //   }
  //   return undefined;
  // }






    // this.processResult(
    //   this._jcms
    //     .getPager<ListeDeContenus>('search', {
    //       params: {
    //         types: 'ListeDeContenus',
    //         exactType: true,
    //         exactCat: true,
    //         catMode: 'and',
    //         cids: [this.curentCat.id],
    //         pageSize: 1,
    //       },
    //     })
    // );


//   public processResult(obs: Observable<JcmsPager<ListeDeContenus>>) {
//     obs.subscribe((pager: JcmsPager<ListeDeContenus>) => {
//       if (!this.listeFaqAccueil) {
//         this.listeFaqAccueil = [];
//       }


//       this.pager = pager;
//       const contents = pager.dataInPage;

//       this.listeDeContenus = contents[0];

//       // liste des thèmes de questions
//       for (let faq of this.listeDeContenus.contenus) {
//         this.listeFaqAccueil.push(faq);

//         let title: string = faq.title;
//         let img = "";

//         this._jcms
//           .get<FaqAccueil>('data/' + faq.id)
//           .subscribe((faqComplete: FaqAccueil) => {
//             if (faqComplete?.categories) {
//               for (let itCat of faqComplete.categories) {
//                 this._catMng.cat(itCat.id).subscribe((cat: Category) => {
//                   if (cat.parent == this.parentCategory && cat.image) {
//                     img = cat.image;
//                     console.log(img);
//                   }
//                 });
//               }
//             }

//             console.log(img);

//             if (!this.result) {
//               this.result = [];
//             }
//             // liste item
//             this.result.push({
//               img: img,
//               lbl: title,
//               url: Util.buildUrlCotent(faq),
//             });
//           });
//       }
//       this.researchRun = false;
//     });
//   }


