import { Meta, Story } from '@storybook/angular';

import UsefullLinksComponent from '@/app/components/usefull-links/usefull-links.components';

export default {
  title: 'Components/UsefullLinks',
  component: UsefullLinksComponent,
} as Meta;

const Template: Story<UsefullLinksComponent> = (
  args: UsefullLinksComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
