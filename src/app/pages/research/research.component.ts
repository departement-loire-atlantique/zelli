import { Component } from '@angular/core';
import { map } from 'rxjs';

import { Content } from '@/app/models/jcms/content';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { Util } from '@/app/util';

import { Item } from '../../components/list/list.component';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.less'],
})
export class ResearchComponent {
  text: string = '';

  researchRun: boolean = false;

  result: Item[] | undefined;

  constructor(private _jcms: JcmsClientService) {}

  public research(): void {
    this.result = undefined;
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
        this.result = [];
        for (let itContent of contents) {
          let title: string = itContent.title;

          if (itContent.class === 'com.jalios.jcms.FileDocument') {
            const fileDoc = itContent as any;

            const type: string = (fileDoc.contentType as string).split('/')[1];

            title += ' (' + type + ' - ' + fileDoc.size / 1000 + ' Ko)';
          }

          this.result.push({
            lbl: title,
            url: Util.buildUrlCotent(itContent),
          });
        }
        this.researchRun = false;
      });
  }

  public lblNbResult(): string {
    if (this.result) {
      if (this.result.length <= 0) {
        return 'Oups, il n’y a pas de résultat. Merci de préciser ou reformuler ta recherche';
      }
      if (this.result.length == 1) {
        return 'Il y a 1 résultat';
      }
      return 'Il y a ' + this.result.length + ' résultats';
    }
    return '';
  }
}
