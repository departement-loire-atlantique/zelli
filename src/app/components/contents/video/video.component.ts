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
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (!this.video && this.id) {
      this.isLoadingVideo = true;
      this.isLoadingIframe = true;
      this.subscriptions = this._jcms
        .get<VideoApi>(`data/${this.id}`)
        .pipe(map((videoFromApi) => mapVideoToUi(videoFromApi)))
        .subscribe({
          next: (res) => {
            this.video = res;
            this.videoUrl = this.getSanitizedUrl(this.video.videoUrl);
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
}
