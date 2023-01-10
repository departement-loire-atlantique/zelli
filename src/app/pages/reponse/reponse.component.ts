import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '@/app/models/jcms/category';
import { QuestionZelli } from '@/app/models/jcms/questionZelli';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';

import { environment } from '@/environments/environment';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.less'],
})
export class ReponseComponent implements OnInit {
  cat: Category | undefined;
  quest: QuestionZelli | undefined;
  loading: boolean = true;
  processSend: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _catMng: CatsMngService,
    private _jcms: JcmsClientService
  ) {}

  ngOnInit(): void {
    this._catMng.cat(environment.catQuestions).subscribe((cat) => {
      this.cat = cat;
    });

    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this._jcms
        .get<QuestionZelli>('data/' + id)
        .subscribe((rep: QuestionZelli) => {
          this.quest = rep;
          this.loading = false;
        });
    });
  }

  public sendAAide(aAide: boolean): void {
    this.processSend = true;
    let body = this._jcms.encodeParamForBody({
      id: this.quest?.id,
      aAide: aAide,
    });
    this._jcms.post('plugins/zelli/question/repInteraction', body).subscribe({
      next: (rep) => {
        this._router.navigate(['/']);
      },
      error: (err) => {
        this.processSend = false;
      },
    });
  }
}
