import { Meta, Story } from '@storybook/angular';

import { ThemeHeaderComponent } from '@/app/components/theme-header/theme-header.component';

export default {
  title: 'Components/ThemeHeader',
  component: ThemeHeaderComponent,
} as Meta;

const Template: Story<ThemeHeaderComponent> = (args: ThemeHeaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  catTheme: {
    id: '0',
    icon: '/assets/icons/icon-72x72.png',
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

export const Small = Template.bind({});
Small.args = {
  big: false,
  catTheme: {
    id: '0',
    icon: '/assets/icons/icon-72x72.png',
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
