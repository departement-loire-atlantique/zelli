import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { IconComponent } from '@/app/components/icon/icon.component';
import { NextLinkComponent } from '@/app/components/next-link/next-link.component';

export default {
  title: 'Components/NextLink',
  component: NextLinkComponent,
  decorators: [
    moduleMetadata({
      declarations: [IconComponent],
    }),
  ],
} as Meta;

const Template: Story<NextLinkComponent> = (args: NextLinkComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
