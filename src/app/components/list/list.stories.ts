import { Meta, Story } from '@storybook/angular';

import { ListComponent } from './list.component';

export default {
  title: 'Components/List',
  component: ListComponent,
} as Meta;

const Template: Story<ListComponent> = (args: ListComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      lbl: 'Item 1',
    },
    {
      lbl: 'Item 2',
    },
    {
      lbl: 'Item 3',
    },
  ],
};

export const All = Template.bind({});
All.args = {
  items: [
    {
      lbl: 'Item 1',
    },
    {
      lbl: 'Item 2',
      url: 'http://google.fr',
    },
    {
      lbl: 'Item 3',
      img: '/assets/icons/icon-72x72.png',
    },
    {
      lbl: 'Item 4',
      url: 'http://google.fr',
      img: '/assets/icons/icon-72x72.png',
    },
  ],
};

export const Link = Template.bind({});
Link.args = {
  items: [
    {
      lbl: 'Item 1',
      url: 'http://google.fr',
    },
    {
      lbl: 'Item 2',
      url: 'http://google.fr',
    },
    {
      lbl: 'Item 3',
      url: 'http://google.fr',
    },
  ],
};

export const Long = Template.bind({});
Long.args = {
  items: [
    {
      lbl: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      lbl: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: 'http://google.fr',
    },
    {
      lbl: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      img: '/assets/icons/icon-72x72.png',
    },
    {
      lbl: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: 'http://google.fr',
      img: '/assets/icons/icon-72x72.png',
    },
  ],
};
