import { environment } from '@/environments/environment';

import { Content } from './content';

export interface VideoApi extends Content {
  urlVideo: string | undefined;
  imagePrincipale: string | undefined;
  description: string | undefined;
}

export interface Video extends Content {
  videoUrl?: string;
  previewPictureUrl?: string;
  description?: string;
}

export const mapVideoToUi = (video: VideoApi): Video => ({
  class: video.class,
  id: video.id,
  title: video.title,
  videoUrl: video.urlVideo,
  previewPictureUrl: `${environment.urlJcms}/${video.imagePrincipale}`,
  description: video.description,
});
