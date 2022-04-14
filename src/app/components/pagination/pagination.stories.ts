import { Meta, Story } from '@storybook/angular';

import { PaginationComponent } from '@/app/components/pagination/pagination.component';

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
} as Meta;

const Template: Story<PaginationComponent> = (args: PaginationComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
