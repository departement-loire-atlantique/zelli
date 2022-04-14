import { Meta, Story } from '@storybook/angular';

import { HeadingComponent } from '@/app/components/heading/heading.component';

export default {
  title: 'Components/Heading',
  component: HeadingComponent,
} as Meta;

const Template: Story<HeadingComponent> = (args: HeadingComponent) => ({
  props: args,
  template: `
    <app-heading [icon]="icon">
      Les contacts
    </app-heading>
  `,
});

export const Default = Template.bind({});
Default.args = {
  icon: '📱',
};

export const NoIcon = Template.bind({});
NoIcon.args = {};
