import { Component, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs';

import { APageHome } from '@/app/models/aPageHome';
import { Video, VideoApi, mapVideoToUi } from '@/app/models/jcms/video';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

import { environment } from '@/environments/environment';

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
    titlePage: TitlePage
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
          cids: [this.curentCat.id, environment.catMainContent],
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
      .pipe(map((videoFromApi) => mapVideoToUi(videoFromApi)))
      .subscribe((res) => {
        this.video = res;
      });
  }
}
