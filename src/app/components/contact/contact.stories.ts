import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { ContactComponent } from '@/app/components/contact/contact.component';
import { HeadingComponent } from '@/app/components/heading/heading.component';

export default {
  title: 'Components/Contact',
  component: ContactComponent,
  decorators: [
    moduleMetadata({
      declarations: [HeadingComponent],
    }),
  ],
} as Meta;

const Template: Story<ContactComponent> = (args: ContactComponent) => ({
  props: args,
  template: `
    <app-contact>
      Le centre des impôts
    </app-contact>
  `,
});

export const Default = Template.bind({});
Default.args = {};
