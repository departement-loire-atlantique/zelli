import { Component, Input, OnInit } from '@angular/core';

import { Video } from '@/app/models/jcms/video';
import { JcmsClientService } from '@/app/services/jcms-client.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less'],
})
export class VideoComponent implements OnInit {
  @Input()
  video: Video | undefined;

  @Input()
  id: string | undefined;

  @Input()
  text: string | undefined;

  isLoadingVideo = false;

  constructor(private _jcms: JcmsClientService) {}

  ngOnInit(): void {
    if (!this.video && this.id) {
      this.isLoadingVideo = true;
      this._jcms
        .get<Video>('data/' + this.id)
        .subscribe((res: Video) => (this.video = res));
    }
  }
}
