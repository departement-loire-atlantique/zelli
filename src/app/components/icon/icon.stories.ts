import { Meta, Story } from '@storybook/angular';

import { IconComponent } from '@/app/components/icon/icon.component';

export default {
  title: 'Components/Icon',
  component: IconComponent,
} as Meta;

const Template: Story<IconComponent> = (args: IconComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  color: 'black',
  name: 'accident',
};

const AllIconsTemplate: Story<{ color: string }> = (args: {
  color: string;
}) => ({
  props: args,
  template: `
    <app-icon color="${args.color}" name="accident"></app-icon>
    <app-icon color="${args.color}" name="arrow-down"></app-icon>
    <app-icon color="${args.color}" name="arrow-left"></app-icon>
    <app-icon color="${args.color}" name="arrow-right"></app-icon>
    <app-icon color="${args.color}" name="arrow-up"></app-icon>
    <app-icon color="${args.color}" name="attention"></app-icon>
    <app-icon color="${args.color}" name="bacs"></app-icon>
    <app-icon color="${args.color}" name="bouchons"></app-icon>
    <app-icon color="${args.color}" name="brume"></app-icon>
    <app-icon color="${args.color}" name="burger"></app-icon>
    <app-icon color="${args.color}" name="bus"></app-icon>
    <app-icon color="${args.color}" name="check"></app-icon>
    <app-icon color="${args.color}" name="compass"></app-icon>
    <app-icon color="${args.color}" name="computer"></app-icon>
    <app-icon color="${args.color}" name="cost"></app-icon>
    <app-icon color="${args.color}" name="cross"></app-icon>
    <app-icon color="${args.color}" name="csv"></app-icon>
    <app-icon color="${args.color}" name="data"></app-icon>
    <app-icon color="${args.color}" name="date"></app-icon>
    <app-icon color="${args.color}" name="deviation"></app-icon>
    <app-icon color="${args.color}" name="directions"></app-icon>
    <app-icon color="${args.color}" name="directory"></app-icon>
    <app-icon color="${args.color}" name="discussion"></app-icon>
    <app-icon color="${args.color}" name="dislike"></app-icon>
    <app-icon color="${args.color}" name="donnees"></app-icon>
    <app-icon color="${args.color}" name="down"></app-icon>
    <app-icon color="${args.color}" name="english"></app-icon>
    <app-icon color="${args.color}" name="etudes"></app-icon>
    <app-icon color="${args.color}" name="facebook"></app-icon>
    <app-icon color="${args.color}" name="fax"></app-icon>
    <app-icon color="${args.color}" name="file"></app-icon>
    <app-icon color="${args.color}" name="flux"></app-icon>
    <app-icon color="${args.color}" name="french"></app-icon>
    <app-icon color="${args.color}" name="fullscreen"></app-icon>
    <app-icon color="${args.color}" name="glaces"></app-icon>
    <app-icon color="${args.color}" name="google"></app-icon>
    <app-icon color="${args.color}" name="handicap-auditif"></app-icon>
    <app-icon color="${args.color}" name="handicap-mental"></app-icon>
    <app-icon color="${args.color}" name="handicap-moteur"></app-icon>
    <app-icon color="${args.color}" name="handicap-visuel"></app-icon>
    <app-icon color="${args.color}" name="help"></app-icon>
    <app-icon color="${args.color}" name="home"></app-icon>
    <app-icon color="${args.color}" name="houle"></app-icon>
    <app-icon color="${args.color}" name="index"></app-icon>
    <app-icon color="${args.color}" name="info"></app-icon>
    <app-icon color="${args.color}" name="instagram"></app-icon>
    <app-icon color="${args.color}" name="invert"></app-icon>
    <app-icon color="${args.color}" name="left"></app-icon>
    <app-icon color="${args.color}" name="like"></app-icon>
    <app-icon color="${args.color}" name="link"></app-icon>
    <app-icon color="${args.color}" name="linkedin"></app-icon>
    <app-icon color="${args.color}" name="long-arrow-down"></app-icon>
    <app-icon color="${args.color}" name="long-arrow-left"></app-icon>
    <app-icon color="${args.color}" name="long-arrow-right"></app-icon>
    <app-icon color="${args.color}" name="long-arrow-up"></app-icon>
    <app-icon color="${args.color}" name="magnifier"></app-icon>
    <app-icon color="${args.color}" name="magweb"></app-icon>
    <app-icon color="${args.color}" name="mail"></app-icon>
    <app-icon color="${args.color}" name="map"></app-icon>
    <app-icon color="${args.color}" name="maree-basse"></app-icon>
    <app-icon color="${args.color}" name="maree-haute"></app-icon>
    <app-icon color="${args.color}" name="marker"></app-icon>
    <app-icon color="${args.color}" name="meteo-alert"></app-icon>
    <app-icon color="${args.color}" name="meteo"></app-icon>
    <app-icon color="${args.color}" name="minus"></app-icon>
    <app-icon color="${args.color}" name="new-window"></app-icon>
    <app-icon color="${args.color}" name="option"></app-icon>
    <app-icon color="${args.color}" name="panne"></app-icon>
    <app-icon color="${args.color}" name="parking"></app-icon>
    <app-icon color="${args.color}" name="pause"></app-icon>
    <app-icon color="${args.color}" name="pdf"></app-icon>
    <app-icon color="${args.color}" name="phone"></app-icon>
    <app-icon color="${args.color}" name="play"></app-icon>
    <app-icon color="${args.color}" name="plus"></app-icon>
    <app-icon color="${args.color}" name="position"></app-icon>
    <app-icon color="${args.color}" name="print"></app-icon>
    <app-icon color="${args.color}" name="ravitaillement"></app-icon>
    <app-icon color="${args.color}" name="right"></app-icon>
    <app-icon color="${args.color}" name="soundcloud"></app-icon>
    <app-icon color="${args.color}" name="star-empty"></app-icon>
    <app-icon color="${args.color}" name="star-full"></app-icon>
    <app-icon color="${args.color}" name="stats"></app-icon>
    <app-icon color="${args.color}" name="summary"></app-icon>
    <app-icon color="${args.color}" name="tag"></app-icon>
    <app-icon color="${args.color}" name="time"></app-icon>
    <app-icon color="${args.color}" name="travaux"></app-icon>
    <app-icon color="${args.color}" name="tripadvisor"></app-icon>
    <app-icon color="${args.color}" name="twitter"></app-icon>
    <app-icon color="${args.color}" name="up"></app-icon>
    <app-icon color="${args.color}" name="user-group"></app-icon>
    <app-icon color="${args.color}" name="user"></app-icon>
    <app-icon color="${args.color}" name="vent"></app-icon>
    <app-icon color="${args.color}" name="video"></app-icon>
    <app-icon color="${args.color}" name="visuel"></app-icon>
    <app-icon color="${args.color}" name="webcam"></app-icon>
    <app-icon color="${args.color}" name="youtube"></app-icon>
  `,
});

export const AllIcons = AllIconsTemplate.bind({});
AllIcons.args = {
  color: 'black',
};
