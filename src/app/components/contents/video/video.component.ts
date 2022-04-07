import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Video } from '@/app/models/jcms/video';
import { JcmsClientService } from '@/app/services/jcms-client.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less'],
})
export class VideoComponent implements OnInit, OnDestroy {
  @Input()
  id?: string;

  @Input()
  text?: string;

  video?: Video;

  isLoadingVideo!: boolean;

  videoUrl?: SafeResourceUrl;

  subscriptions?: Subscription;

  constructor(
    private _jcms: JcmsClientService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (!this.video && this.id) {
      this.isLoadingVideo = true;
      this.subscriptions = this._jcms
        .get<Video>('data/' + this.id)
        .subscribe((res) => {
          this.video = res;
          this.updateVideoUrl();
          this.isLoadingVideo = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  updateVideoUrl(): void {
    if (this.video?.urlVideo) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.video?.urlVideo
      );
    }
  }
}
