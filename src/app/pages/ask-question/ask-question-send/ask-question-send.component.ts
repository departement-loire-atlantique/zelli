import { Component, Injector, OnInit } from '@angular/core';

import { Category } from '@/app/models/jcms/category';
import { CatsMngService } from '@/app/services/cats-mng.service';

@Component({
    selector: 'app-questions-send',
    templateUrl: './ask-question-send.component.html',
    styleUrls: ['./ask-question-send.component.less'],
})
export class AskQuestionSendComponent  {

    curentCat: Category | undefined;
    parentCat: Category | undefined;

    tmp:string = "rzelli_1394930"; //cat envoie

    constructor(
        private _catMng: CatsMngService) {
        this._catMng.cat(this.tmp).subscribe((cat) => {
            this.curentCat = cat;
            if(cat.parent)
                this._catMng.cat(cat.parent).subscribe((parent) => (this.parentCat = parent));
        });
    }
}