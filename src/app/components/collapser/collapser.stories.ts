import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { CollapserElementComponent } from '@/app/components/collapser/collapser-element/collapser-element.component';
import { CollapserComponent } from '@/app/components/collapser/collapser.component';

export default {
  title: 'Components/Collapser',
  component: CollapserComponent,
  decorators: [
    moduleMetadata({
      declarations: [CollapserComponent, CollapserElementComponent],
    }),
  ],
} as Meta;

export const Default: Story<CollapserComponent> = (
  args: CollapserComponent
) => ({
  props: args,
  template: `
    <app-collapser>
      <app-collapser-item title="Titre">Contenu</app-collapser-item>
      <app-collapser-item title="Titre">Contenu</app-collapser-item>
      <app-collapser-item title="Titre">Contenu</app-collapser-item>
    </app-collapser>
  `,
});
