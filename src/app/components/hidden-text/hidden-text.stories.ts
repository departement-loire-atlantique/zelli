import { Meta, Story } from '@storybook/angular';

import { HiddenTextComponent } from './hidden-text.component';

export default {
  title: 'Components/HiddenText',
  component: HiddenTextComponent,
} as Meta;

const Template: Story<HiddenTextComponent> = (args: HiddenTextComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  text: '<div class="wysiwyg">\
    <p>Diaporama version texte.</p>\
    <p>Diaporama version <strong>texte</strong>.</p>\
    </div>',
};
