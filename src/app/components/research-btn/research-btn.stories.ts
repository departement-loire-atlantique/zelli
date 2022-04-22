import { Meta, Story } from '@storybook/angular';

import { ResearchBtnComponent } from './research-btn.component';

export default {
  title: 'Components/Research btn',
  component: ResearchBtnComponent,
} as Meta;

const Template: Story<ResearchBtnComponent> = (args: ResearchBtnComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
