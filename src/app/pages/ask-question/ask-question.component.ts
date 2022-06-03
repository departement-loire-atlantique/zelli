import { Component, Injector, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Category } from '@/app/models/jcms/category';
import { CatsMngService } from '@/app/services/cats-mng.service';

@Component({
    selector: 'app-ask-questions',
    templateUrl: './ask-question.component.html',
    styleUrls: ['./ask-question.component.less'],
})
export class AskQuestionComponent {
    curentCat: Category | undefined;
    parentCat: Category | undefined;

    constructor(private _route: ActivatedRoute,
        private _catMng: CatsMngService) {
        const id = this._route.snapshot.paramMap.get('id');

        if (!id) {
            return;
        }

        this._catMng.cat(id).subscribe((cat) => {
            this.curentCat = cat;
            if(cat.parent)
                this._catMng.cat(cat.parent).subscribe((parent) => (this.parentCat = parent));
        });
    }

}