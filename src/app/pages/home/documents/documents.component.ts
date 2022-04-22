import { Component, Injector, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { APageHome } from '@/app/models/aPageHome';
import { Video, VideoApi, mapVideoToUi } from '@/app/models/jcms/video';
import { JcmsClientService } from '@/app/services/jcms-client.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.less'],
})
export class DocumentsComponent extends APageHome implements OnInit {
  video: Video | undefined;

  constructor(_injector: Injector, private _jcms: JcmsClientService) {
    super(_injector);
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
          cids: this.curentCat.id,
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
