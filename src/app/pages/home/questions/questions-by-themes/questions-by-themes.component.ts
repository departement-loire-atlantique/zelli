import { Component, Injector, OnInit } from '@angular/core';
import { APageHome } from '@/app/models/aPageHome';
import { ActivatedRoute } from '@angular/router';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { Category } from '@/app/models/jcms/category';

import { Observable } from 'rxjs';
import { JcmsPager } from '@/app/core/jcmsPager';
import { Content } from '@/app/models/jcms/content';

import { Item } from '@/app/components/list/list.component';
import { Util } from '@/app/util';

import { FaqAccueil } from '@/app/models/jcms/faqAccueil';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { CatsHomeMngService } from '@/app/services/cats-home-mng.service';
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

    constructor(
        private _route: ActivatedRoute, 
        private _catMng: CatsMngService,
        private _catsHome: CatsHomeMngService,
        private _jcms: JcmsClientService) {
    }

    ngOnInit(): void {
        this._route.paramMap.subscribe((params) => {
            const id = params.get('id');
            this._jcms
                .get<FaqAccueil>('data/' + id)
                .subscribe((faq: FaqAccueil) => {
                    this.faqAccueil = faq;
                    this.getCategories();
                    this.getFaqEntry();
                });
        });
    }

    // get les categories pour afficher surtitre et icon
    getCategories() {
        if (this.faqAccueil?.categories) {
            for (let itCat of this.faqAccueil.categories) {
                this._catMng.cat(itCat.id).subscribe((cat: Category) => {

                    if (this._catsHome.getCatFromUrl(cat.url)) { 
                        this.surtitre = cat.title;
                    } else if (cat.icon) {
                        this.icon = cat.icon; 
                    }

                });
            }
        }
    }

    // get liste faq entrée (TODO trie sur catégorie avant boucle)
    getFaqEntry() {
        if (this.faqAccueil) {
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

                for (let itContent of contents) {
                    if(itContent.faq && itContent.faq.id == this.faqAccueil?.id)
                        this.faqEntry.push(itContent);
                }
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
}

// pager + nb de questions a afficher
