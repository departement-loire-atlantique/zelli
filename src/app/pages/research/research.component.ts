import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { Content } from '@/app/models/jcms/content';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { Util } from '@/app/util';

import { environment } from '@/environments/environment';

import { Item } from '../../components/list/list.component';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.less'],
})
export class ResearchComponent {
  text: string = '';

  researchRun: boolean = false;

  result: Item[] = [];

  constructor(private _jcms: JcmsClientService) {}

  public research(): void {
    if (!this.text) {
      return;
    }
    this.researchRun = true;

    this._jcms
      .get('search', {
        params: {
          text: this.text,
          types: ['SousthemeASE', 'ArticleASE', 'Contact', 'FileDocument'],
          exactType: true,
        },
      })
      .pipe(map((rep: any): Content[] => rep.dataSet))
      .subscribe((contents: Content[]) => {
        console.log(contents);
        for (let itContent of contents) {
          this.result.push({
            lbl: itContent.title,
            url: Util.buildUrlCotent(itContent),
          });
        }
        this.researchRun = false;
      });
  }
}
