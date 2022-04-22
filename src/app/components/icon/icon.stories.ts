import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { IconComponent } from '@/app/components/icon/icon.component';

export default {
  title: 'Components/Icon',
  component: IconComponent,
} as Meta;

const Template: Story<IconComponent> = (args: IconComponent) => ({
  props: args,
  template: `
    <app-icon name="accident"></app-icon>
    <app-icon name="arrow-down"></app-icon>
    <app-icon name="arrow-left"></app-icon>
    <app-icon name="arrow-right"></app-icon>
    <app-icon name="arrow-up"></app-icon>
    <app-icon name="attention"></app-icon>
    <app-icon name="bacs"></app-icon>
    <app-icon name="bouchons"></app-icon>
    <app-icon name="brume"></app-icon>
    <app-icon name="burger"></app-icon>
    <app-icon name="bus"></app-icon>
    <app-icon name="check"></app-icon>
    <app-icon name="compass"></app-icon>
    <app-icon name="computer"></app-icon>
    <app-icon name="cost"></app-icon>
    <app-icon name="cross"></app-icon>
    <app-icon name="csv"></app-icon>
    <app-icon name="data"></app-icon>
    <app-icon name="date"></app-icon>
    <app-icon name="deviation"></app-icon>
    <app-icon name="directions"></app-icon>
    <app-icon name="directory"></app-icon>
    <app-icon name="discussion"></app-icon>
    <app-icon name="dislike"></app-icon>
    <app-icon name="donnees"></app-icon>
    <app-icon name="down"></app-icon>
    <app-icon name="english"></app-icon>
    <app-icon name="etudes"></app-icon>
    <app-icon name="facebook"></app-icon>
    <app-icon name="fax"></app-icon>
    <app-icon name="file"></app-icon>
    <app-icon name="flux"></app-icon>
    <app-icon name="french"></app-icon>
    <app-icon name="fullscreen"></app-icon>
    <app-icon name="glaces"></app-icon>
    <app-icon name="google"></app-icon>
    <app-icon name="handicap-auditif"></app-icon>
    <app-icon name="handicap-mental"></app-icon>
    <app-icon name="handicap-moteur"></app-icon>
    <app-icon name="handicap-visuel"></app-icon>
    <app-icon name="help"></app-icon>
    <app-icon name="home"></app-icon>
    <app-icon name="houle"></app-icon>
    <app-icon name="index"></app-icon>
    <app-icon name="info"></app-icon>
    <app-icon name="instagram"></app-icon>
    <app-icon name="invert"></app-icon>
    <app-icon name="left"></app-icon>
    <app-icon name="like"></app-icon>
    <app-icon name="link"></app-icon>
    <app-icon name="linkedin"></app-icon>
    <app-icon name="long-arrow-down"></app-icon>
    <app-icon name="long-arrow-left"></app-icon>
    <app-icon name="long-arrow-right"></app-icon>
    <app-icon name="long-arrow-up"></app-icon>
    <app-icon name="magnifier"></app-icon>
    <app-icon name="magweb"></app-icon>
    <app-icon name="mail"></app-icon>
    <app-icon name="map"></app-icon>
    <app-icon name="maree-basse"></app-icon>
    <app-icon name="maree-haute"></app-icon>
    <app-icon name="marker"></app-icon>
    <app-icon name="meteo-alert"></app-icon>
    <app-icon name="meteo"></app-icon>
    <app-icon name="minus"></app-icon>
    <app-icon name="new-window"></app-icon>
    <app-icon name="option"></app-icon>
    <app-icon name="panne"></app-icon>
    <app-icon name="parking"></app-icon>
    <app-icon name="pause"></app-icon>
    <app-icon name="pdf"></app-icon>
    <app-icon name="phone"></app-icon>
    <app-icon name="play"></app-icon>
    <app-icon name="plus"></app-icon>
    <app-icon name="position"></app-icon>
    <app-icon name="print"></app-icon>
    <app-icon name="ravitaillement"></app-icon>
    <app-icon name="right"></app-icon>
    <app-icon name="soundcloud"></app-icon>
    <app-icon name="star-empty"></app-icon>
    <app-icon name="star-full"></app-icon>
    <app-icon name="stats"></app-icon>
    <app-icon name="summary"></app-icon>
    <app-icon name="tag"></app-icon>
    <app-icon name="time"></app-icon>
    <app-icon name="travaux"></app-icon>
    <app-icon name="tripadvisor"></app-icon>
    <app-icon name="twitter"></app-icon>
    <app-icon name="up"></app-icon>
    <app-icon name="user-group"></app-icon>
    <app-icon name="user"></app-icon>
    <app-icon name="vent"></app-icon>
    <app-icon name="video"></app-icon>
    <app-icon name="visuel"></app-icon>
    <app-icon name="webcam"></app-icon>
    <app-icon name="youtube"></app-icon>
  `,
});

export const Default = Template.bind({});
Default.args = {};
