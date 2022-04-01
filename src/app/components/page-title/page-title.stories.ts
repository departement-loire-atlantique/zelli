import { Meta, Story } from '@storybook/angular';

import { PageTitleComponent } from '@/app/components/page-title/page-title.component';

export default {
  title: 'Components/PageTitle',
  component: PageTitleComponent,
} as Meta;

const Template: Story<PageTitleComponent> = (args: PageTitleComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  curentCat: {
    id: '0',
    icon: 'icon-like',
    title: 'Title',
    subTitle: 'Subtitle',
    idContentTrieur: '0',
    image: '',
    order: 0,
    smallTitle: '',
    url: '',
  },
};
