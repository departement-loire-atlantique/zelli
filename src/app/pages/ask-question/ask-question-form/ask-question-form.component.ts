import { Component, Injector, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { APageHome } from '@/app/models/aPageHome';

import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@/app/models/jcms/category';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';

import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-questions',
    templateUrl: './ask-question-form.component.html',
    styleUrls: ['./ask-question-form.component.less'],
})
export class AskQuestionFormComponent  {

    curentCat: Category | undefined;
    parentCat: Category | undefined;

    tmp:string = environment.catAskQuestionForm; // cat référent
    typeName: string = "Faq";

    constructor(private _route: ActivatedRoute,
        private router: Router,
        private _catMng: CatsMngService,
        private _jcms: JcmsClientService) {
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
        
        
        // const options = { 
        //     headers: {
        //         //'Access-Control-Allow-Origin': 'http://localhost:4200',
        //         'Authorization': 'Basic YWRtaW46YWRtaW4=',
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        //         'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type',
        //     },
        //     params: {
        //         title: "question",
        //         description: "desc", 
        //     }
        // };

        // this._jcms.post('data/' + this.typeName, undefined, options).subscribe(s => {
        //       console.log(s);
        //   });


        this.router.navigate(['/ask-questions-send/']); 
     }

}