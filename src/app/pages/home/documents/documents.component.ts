import { Component, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs';

import { APageHome } from '@/app/models/aPageHome';
import { Video, VideoApi, mapVideoToUi } from '@/app/models/jcms/video';
import { AppConfigService } from '@/app/services/app-config.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less'],
})
export class DocumentsComponent extends APageHome implements OnInit {
  video: Video | undefined;

  constructor(
    _injector: Injector,
    private _jcms: JcmsClientService,
    private titleService: Title,
    titlePage: TitlePage,
    private appConfigService: AppConfigService
  ) {
    super(_injector);
    this.titleService.setTitle(titlePage.getTitle('Mes documents'));
  }

  ngOnInit(): void {
    if (!this.curentCat) {
      return;
    }
    this._jcms
      .get<VideoApi>('search', {
        params: {
          types: 'Video',
          exactCat: true,
          catMode: 'and',
          cids: [
            this.curentCat.id,
            this.appConfigService.config.catMainContent,
          ],
          pageSize: 1,
        },
      })
      .pipe(
        map((rep: any) => {
          if (rep.dataSet && rep.dataSet.length) {
            return rep.dataSet[0];
          }
          return rep;
        })
      )
      .pipe(
        map((videoFromApi) =>
          mapVideoToUi(videoFromApi, this.appConfigService.config.urlJcms)
        )
      )
      .subscribe((res) => {
        this.video = res;
      });
  }
}
