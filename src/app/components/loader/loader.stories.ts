import { Meta, Story } from '@storybook/angular';

import { LoaderComponent } from '@/app/components/loader/loader.component';

export default {
  title: 'Components/Loader',
  component: LoaderComponent,
} as Meta;

const Template: Story<LoaderComponent> = (args: LoaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  color: 'blue',
};
