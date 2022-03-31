// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0';

import { BackComponent } from './back.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Components/Back',
  component: BackComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
} as Meta;

// // More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
export const Default: Story<BackComponent> = (args: BackComponent) => ({
  props: args,
});

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/angular/writing-stories/args
// Primary.args = {};
