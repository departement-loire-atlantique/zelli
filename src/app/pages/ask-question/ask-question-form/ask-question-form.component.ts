import { Component, Injector, OnInit } from '@angular/core';
import { APageHome } from '@/app/models/aPageHome';

import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@/app/models/jcms/category';
import { CatsMngService } from '@/app/services/cats-mng.service';

@Component({
    selector: 'app-questions',
    templateUrl: './ask-question-form.component.html',
    styleUrls: ['./ask-question-form.component.less'],
})
export class AskQuestionFormComponent  {

    curentCat: Category | undefined;
    parentCat: Category | undefined;

    tmp:string = "rzelli_1394929"; // cat référent

    constructor(private _route: ActivatedRoute,
        private router: Router,
        private _catMng: CatsMngService) {
        const talkToRef = this._route.snapshot.paramMap.get('bool');

        if (!talkToRef) {
            return;
        }

        this._catMng.cat(this.tmp).subscribe((cat) => {
            this.curentCat = cat;
            if(cat.parent)
                this._catMng.cat(cat.parent).subscribe((parent) => (this.parentCat = parent));
        });
    }

    onClickSubmit(result:any) {
        console.log("You have entered : " + result.question);
        
        this.router.navigate(['/ask-questions-send/']); 
     }

}