import { Router } from '@angular/router';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { MainMenuComponent } from '@/app/components/main-menu/main-menu.component';
import { CatsHomeMngService } from '@/app/services/cats-home-mng.service';

export default {
  title: 'Components/MainMenu',
  component: MainMenuComponent,
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/',
          },
        },
        {
          provide: CatsHomeMngService,
          useValue: {
            getCats: () => [
              {
                url: '/',
                icon: 'arrow-left',
                smallTitle: 'Menu entry 1',
              },
              {
                url: '/menu2',
                icon: 'arrow-left',
                smallTitle: 'Menu entry 2',
              },
              {
                url: '/menu3',
                icon: 'arrow-left',
                smallTitle: 'Menu entry 3',
              },
              {
                url: '/menu4',
                icon: 'arrow-left',
                smallTitle: 'Menu entry 4',
              },
            ],
          },
        },
      ],
    }),
  ],
} as Meta;

const Template: Story<MainMenuComponent> = (args: MainMenuComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
