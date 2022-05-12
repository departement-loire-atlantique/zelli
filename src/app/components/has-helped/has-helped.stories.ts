import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { HasHelpedComponent } from '@/app/components/has-helped/has-helped.component';
import { IconComponent } from '@/app/components/icon/icon.component';

export default {
  title: 'Components/HasHelped',
  component: HasHelpedComponent,
  decorators: [
    moduleMetadata({
      declarations: [IconComponent],
    }),
  ],
} as Meta;

const Template: Story<HasHelpedComponent> = (args: HasHelpedComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
