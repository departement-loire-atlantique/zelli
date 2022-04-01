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
  big: false,
  catTheme: {
    id: '0',
    icon: 'http://localhost:8080/zelli/upload/docs/image/png/2022-03/picto-demarches.png',
    title: 'Title',
    subTitle: 'Subtitle',
    idContentTrieur: '0',
    image: '',
    order: 0,
    smallTitle: '',
    url: '',
  },
};
