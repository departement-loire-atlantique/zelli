import { Meta, Story } from '@storybook/angular';

import { CollapserComponent } from '@/app/components/collapser/collapser.component';

export default {
  title: 'Components/Collapser',
  component: CollapserComponent,
} as Meta;

const Template: Story<CollapserComponent> = (args: CollapserComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  dataTitle: ['Title 1', 'Title 2', 'Title 3'],
  dataVal: ['Content 1', 'Content 2', 'Content 3'],
};
