import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@/app/models/jcms/category';
import { Member } from '@/app/models/jcms/member';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-questions',
  templateUrl: './ask-question-form.component.html',
  styleUrls: ['./ask-question-form.component.less'],
})
export class AskQuestionFormComponent {

  curentCat: Category | undefined;
  parentCat: Category | undefined;

  tmp: string = environment.catAskQuestionForm; // cat formulaire
  ref: string | null;

  /**
   * Initialise la catégorie "formulaire" et la catégorie "poser une question"
   * Vérifie que l'utilisateur a bien répondu à la question du référent
   * @param _catMng le manager de catégories
   */
  constructor(private _route: ActivatedRoute,
    private router: Router,
    private _catMng: CatsMngService,
    private _jcms: JcmsClientService) {
    this.ref = this._route.snapshot.paramMap.get('bool');

    if (!this.ref) {
      return;
    }

    if (!(this.ref == "true" || this.ref == "false")) {
      this.router.navigate(['/questions/']);
    }

    this._catMng.cat(this.tmp).subscribe((cat) => {
      this.curentCat = cat;
      if (cat.parent)
        this._catMng.cat(cat.parent).subscribe((parent) => (this.parentCat = parent));
    });
  }

  /**
   * Effectue une action lors de l'envoie du formulaire de la question
   * @param result les champs envoyé lors de l'appuie du bouton du formulaire
   */
  public onClickSubmit(result: any) {

    if (result.question != "") {

      // enregistre la question
      const options = {
        title: "Question",
        question: result.question,
        referent: (this.ref == "true") ? true : false,
      };

      let typeName: string = "QuestionZelli";

      let urlEncodedDataQuestion = this._jcms.encodeParamForBody(options);
      this._jcms.post('data/' + typeName, urlEncodedDataQuestion).subscribe();
      this.router.navigate(['/ask-questions-send/']);
    }

  }

}
