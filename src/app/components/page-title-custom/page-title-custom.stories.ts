import { Meta, Story } from '@storybook/angular';

import { PageTitleCustomComponent } from '@/app/components/page-title-custom/page-title-custom.component';

export default {
  title: 'Components/PageTitle',
  component: PageTitleCustomComponent,
} as Meta;

const Template: Story<PageTitleCustomComponent> = (
  args: PageTitleCustomComponent
) => ({
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
    parent: undefined,
  },
};
