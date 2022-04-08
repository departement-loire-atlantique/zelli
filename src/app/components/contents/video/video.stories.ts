import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { from } from 'rxjs';

import { VideoComponent } from '@/app/components/contents/video/video.component';
import { LoaderComponent } from '@/app/components/loader/loader.component';
import { JcmsClientService } from '@/app/services/jcms-client.service';

export default {
  title: 'Components/Video',
  component: VideoComponent,
  decorators: [
    moduleMetadata({
      declarations: [LoaderComponent],
      providers: [
        {
          provide: JcmsClientService,
          useValue: {
            get: () =>
              from([
                {
                  class: 'class',
                  id: 'id',
                  title: 'title',
                  urlVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  imagePrincipale: 'https://picsum.photos/600/400', // Will not work because of the concatenation with the backend asset endpoint
                },
              ]),
          },
        },
      ],
    }),
  ],
} as Meta;

const Template: Story<VideoComponent> = (args: VideoComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  id: 'id',
};
