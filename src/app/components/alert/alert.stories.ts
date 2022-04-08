import { Meta, Story } from '@storybook/angular';

import { AlertComponent } from '@/app/components/alert/alert.component';

export default {
  title: 'Components/Alert',
  component: AlertComponent,
} as Meta;

const Template: Story<AlertComponent> = (args: AlertComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  description: 'Description',
};

export const Error = Template.bind({});
Error.args = {
  description: 'Description',
  status: 'error',
};

export const Success = Template.bind({});
Success.args = {
  description: 'Description',
  status: 'success',
};
