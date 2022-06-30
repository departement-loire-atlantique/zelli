import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

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

    tmp:string = environment.catAskQuestionRef; //cat referent

    /**
     * Initialise la catégorie "référent" et la catégorie "poser une question"
     * @param _catMng le manager de catégories
     */
    constructor(private _catMng: CatsMngService) {
        this._catMng.cat(this.tmp).subscribe((cat) => {
            this.curentCat = cat;
            if(cat.parent)
                this._catMng.cat(cat.parent).subscribe((parent) => (this.parentCat = parent));
        });
    }

}
