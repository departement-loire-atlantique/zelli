import { Component, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Category } from '@/app/models/jcms/category';
import { AppConfigService } from '@/app/services/app-config.service';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-questions-send',
  templateUrl: './ask-question-send.component.html',
  styleUrls: ['./ask-question-send.component.less'],
})
export class AskQuestionSendComponent {
  curentCat: Category | undefined;
  parentCat: Category | undefined;

  tmp: string = '';

  /**
   * Initialise la catégorie "envoie" et la catégorie "poser une question"
   * @param _catMng le manager de catégories
   */
  constructor(
    private _catMng: CatsMngService,
    private titleService: Title,
    titlePage: TitlePage,
    private appConfigService: AppConfigService
  ) {
    this.tmp = this.appConfigService.config.catAskQuestionSend;
    this.titleService.setTitle(titlePage.getTitle('Question envoyé'));

    this._catMng.cat(this.tmp).subscribe((cat) => {
      this.curentCat = cat;
      if (cat.parent)
        this._catMng
          .cat(cat.parent)
          .subscribe((parent) => (this.parentCat = parent));
    });
  }
}
