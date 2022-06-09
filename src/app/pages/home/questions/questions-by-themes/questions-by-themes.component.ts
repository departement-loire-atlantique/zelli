import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { Category } from '@/app/models/jcms/category';

import { JcmsPager } from '@/app/core/jcmsPager';
import { environment } from 'src/environments/environment'; 

import { Item } from '@/app/components/list/list.component';

import { FaqAccueil } from '@/app/models/jcms/faqAccueil';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { FaqEntry } from '@/app/models/jcms/faqEntry';

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
    askQuestionCat = environment.catAskQuestionRef;
    


    constructor(
        private _route: ActivatedRoute,
        private _catMng: CatsMngService,
        private _jcms: JcmsClientService) {
    }

    ngOnInit(): void {
        this._route.paramMap.subscribe((params) => {
            const id = params.get('id')!;
            this._jcms
                .get<FaqAccueil>('data/' + id)
                .subscribe((faq: FaqAccueil) => {
                    this.faqAccueil = faq;
                    this.getCategories();
                    this.getFaqEntry(id);
                });
        });
    }

    // get les categories pour afficher surtitre et icon
    getCategories() {
        if (this.faqAccueil && this.faqAccueil.categories) {
            for (let itCat of this.faqAccueil.categories) {
                this._catMng.cat(itCat.id).subscribe((cat: Category) => {
                    if (cat.id == this.questionsCat) {
                        this.surtitre = cat.title;
                    } else if (cat.parent == this.parentCat && cat.icon) {
                        this.icon = cat.icon;
                    }
                });
            }
        }
    }

    // get liste faq entrée
    getFaqEntry(id: string) {
        if (this.faqAccueil && id) {
            this._jcms.getPager<FaqEntry>('search', {
                params: {
                    types: 'FaqEntry',
                    exactType: true,
                },
            }).subscribe((pager: JcmsPager<FaqEntry>) => {
                if (!this.faqEntry) {
                    this.faqEntry = [];
                }

                this.pager = pager;
                const contents = pager.dataInPage;
                this.faqEntry = contents.filter(s => {
                    if (s.faq && s.faq.id) {
                        return s.faq.id == id;
                    } else {
                        return false;
                    }
                });
            });

        }
    }

    getSurtitre(): string | undefined {
        return this.surtitre;
    }

    getIcon(): string | undefined {
        return this.icon;
    }

    getQuestionsTitle(): string[] | undefined {
        return this.faqEntry?.map(
            (itFaqEntry: FaqEntry) => itFaqEntry.title
        );
    }

    getAnswers(): string[] | undefined {
        return this.faqEntry?.map(
            (itFaqEntry: FaqEntry) => itFaqEntry.answer
        );
    }

    public getAskQuestionCat() {
      return this.askQuestionCat;
    }

    
    // private swipeCoord?: [number, number];
    // private swipeTime?: number;
    // swipe(e: TouchEvent, when: string): void {
    //     const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    //     const time = new Date().getTime();
      
    //     if (when === 'start') {
    //       this.swipeCoord = coord;
    //       this.swipeTime = time;
    //     } else if (when === 'end' && this.swipeCoord && this.swipeTime) {
    //       const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
    //       const duration = time - this.swipeTime;
      
    //       if (duration < 1000 //
    //         && Math.abs(direction[0]) > 30 // Long enough
    //         && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
    //           const swipe = direction[0] < 0 ? 'next' : 'previous';
    //           // Do whatever you want with swipe
    //       }
    //     }
    //   }
}

// pager + nb de questions a afficher
