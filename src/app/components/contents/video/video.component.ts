import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription, map } from 'rxjs';

import { Video, VideoApi, mapVideoToUi } from '@/app/models/jcms/video';
import { AppConfigService } from '@/app/services/app-config.service';
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

  @Input()
  squareFormat: boolean = false;

  video?: Video;

  isLoadingVideo = false;
  isLoadingIframe = false;

  videoUrl?: SafeResourceUrl;
  previewPictureUrl?: SafeResourceUrl;

  private subscriptions?: Subscription;

  constructor(
    private _jcms: JcmsClientService,
    private sanitizer: DomSanitizer,
    private appConfigService: AppConfigService
  ) {}

  ngOnInit(): void {
    if (!this.video && this.id) {
      this.isLoadingVideo = true;
      this.isLoadingIframe = true;
      this.subscriptions = this._jcms
        .get<VideoApi>(`data/${this.id}`)
        .pipe(
          map((videoFromApi) =>
            mapVideoToUi(videoFromApi, this.appConfigService.config.urlJcms)
          )
        )
        .subscribe({
          next: (res) => {
            this.video = res;
            let videoUrlStr = this.video.videoUrl;
            if (videoUrlStr && videoUrlStr.includes('?')) {
              videoUrlStr += '&rel=0';
            } else {
              videoUrlStr += '?rel=0';
            }
            this.videoUrl = this.getSanitizedUrl(videoUrlStr);
            this.previewPictureUrl = this.getSanitizedUrl(
              this.video.previewPictureUrl
            );
            this.isLoadingVideo = false;
          },
          error: () => {
            this.isLoadingVideo = false;
            this.isLoadingIframe = false;
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  private getSanitizedUrl(unsafeUrl?: string): SafeResourceUrl | undefined {
    if (!unsafeUrl) return;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  handleOnLoad(): void {
    this.isLoadingIframe = false;
  }

  squarePlayer() {
    if (this.squareFormat) return 'square-format';
    return '';
  }

  checkURL(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/) != null;
  }
}
