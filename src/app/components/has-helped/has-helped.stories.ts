import { Meta, Story } from '@storybook/angular';

import { HasHelpedComponent } from '@/app/components/has-helped/has-helped.component';

export default {
  title: 'Components/HasHelped',
  component: HasHelpedComponent,
} as Meta;

const Template: Story<HasHelpedComponent> = (args: HasHelpedComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
