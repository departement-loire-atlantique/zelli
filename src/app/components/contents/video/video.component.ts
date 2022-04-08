import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription, map } from 'rxjs';

import { Video, VideoApi, mapVideoToUi } from '@/app/models/jcms/video';
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

  isLoadingVideo = false;
  isLoadingIframe = false;

  videoUrl?: SafeResourceUrl;
  previewPictureUrl?: SafeResourceUrl;

  subscriptions?: Subscription;

  constructor(
    private _jcms: JcmsClientService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (!this.video && this.id) {
      this.isLoadingVideo = true;
      this.isLoadingIframe = true;
      this.subscriptions = this._jcms
        .get<VideoApi>('data/' + this.id)
        .pipe(map((videoFromApi) => mapVideoToUi(videoFromApi)))
        .subscribe((res) => {
          this.video = res;
          this.videoUrl = this.getSanitizedUrl(this.video.videoUrl);
          this.previewPictureUrl = this.getSanitizedUrl(
            this.video.previewPictureUrl
          );
          this.isLoadingVideo = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  getSanitizedUrl(unsafeUrl?: string): SafeResourceUrl | undefined {
    if (!unsafeUrl) return;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  handleOnLoad(): void {
    console.log('loaded');
    this.isLoadingIframe = false;
  }
}
