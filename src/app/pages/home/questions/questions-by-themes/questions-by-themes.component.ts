import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Item } from '@/app/components/list/list.component';
import { JcmsPager } from '@/app/core/jcmsPager';
import { Category } from '@/app/models/jcms/category';
import { FaqAccueil } from '@/app/models/jcms/faqAccueil';
import { FaqEntry } from '@/app/models/jcms/faqEntry';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions-by-themes.component.html',
  styleUrls: ['./questions-by-themes.component.less'],
})
export class QuestionsByThemesComponent implements OnInit {
  pager: JcmsPager<FaqEntry> | undefined;
  faqAccueil: FaqAccueil | undefined;
  faqEntry: FaqEntry[] | undefined;
  result: Item[] | undefined;

  surtitre: string | undefined;
  icon: string | undefined;

  parentCat = environment.catThemes; //cat explorer par theme
  questionsCat = environment.catQuestions;

  constructor(
    private _route: ActivatedRoute,
    private _catMng: CatsMngService,
    private _jcms: JcmsClientService
  ) {}

  /**
   * Initialise la FAQ de la page et sa catégorie
   */
  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this._jcms.get<FaqAccueil>('data/' + id).subscribe((faq: FaqAccueil) => {
        this.faqAccueil = faq;
        this.getCategories();
        this.getFaqEntry(id);
      });
    });
  }

  /**
   * Get les categories pour afficher surtitre et icon
   */
  private getCategories() {
    if (this.faqAccueil && this.faqAccueil.categories) {
      for (let itCat of this.faqAccueil.categories) {
        this._catMng.cat(itCat.id).subscribe((cat: Category) => {
          if (cat.id == this.questionsCat) {
            this.surtitre = cat.title;
          } else if (cat.parent == this.parentCat && cat.icon) {
            this.icon = cat.blob;
          }
        });
      }
    }
  }

  /**
   * Get la liste de FAQ Entrée de la FAQ Accueil
   * @param id Id de la FAQ Accueil
   */
  private getFaqEntry(id: string) {
    if (this.faqAccueil && id) {
      this._jcms
        .getPager<FaqEntry>('search', {
          params: {
            types: 'FaqEntry',
            exactType: true,
          },
        })
        .subscribe((pager: JcmsPager<FaqEntry>) => {
          if (!this.faqEntry) {
            this.faqEntry = [];
          }

          this.pager = pager;
          const contents = pager.dataInPage;

          // liste des faq entrée qui appartiennent à la faq accueil
          this.faqEntry = contents.filter((s) => {
            if (s.faq && s.faq.id) {
              return s.faq.id == id;
            } else {
              return false;
            }
          });
        });
    }
  }

  /**
   * Get le surtitre de la catégorie de la page
   * @returns le surtitre
   */
  public getSurtitre(): string | undefined {
    return this.surtitre;
  }

  /**
   * Get l'icon de la catégorie de la page
   * @returns
   */
  public getIcon(): string | undefined {
    return this.icon;
  }

  /**
   * Get la liste de question
   * @returns la liste de question
   */
  public getQuestionsTitle(): string[] | undefined {
    return this.faqEntry?.map((itFaqEntry: FaqEntry) => itFaqEntry.title);
  }

  /**
   * Get la liste de réponses
   * @returns la liste de réponses
   */
  public getAnswers(): string[] | undefined {
    return this.faqEntry?.map((itFaqEntry: FaqEntry) => itFaqEntry.answer);
  }
}
