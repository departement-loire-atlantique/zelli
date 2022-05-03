import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { from } from 'rxjs';

import { ContactDetailsComponent } from '@/app/components/contact/contact-details/contact-details.component';
import { ContactComponent } from '@/app/components/contact/contact.component';
import { HeadingComponent } from '@/app/components/heading/heading.component';
import { IconComponent } from '@/app/components/icon/icon.component';
import { ListComponent } from '@/app/components/list/list.component';
import { LoaderComponent } from '@/app/components/loader/loader.component';
import { Contact } from '@/app/models/jcms/contact';
import { ContactDetailsService } from '@/app/services/contact-details.service';

export default {
  title: 'Components/Contact',
  component: ContactComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        HeadingComponent,
        ContactDetailsComponent,
        IconComponent,
        ListComponent,
        LoaderComponent,
      ],
      providers: [
        {
          provide: ContactDetailsService,
          useValue: {
            getContacts: () =>
              from([
                {
                  title: 'Les centres des impôts',
                  email: 'adresseemail@impots.gouv.fr',
                  id: 'unique-id',
                  phoneNumber: ['0240991282'],
                  location: {
                    city: 'Nantes',
                    roadNumber: '3',
                    roadName: 'quai Ceineray',
                    cs: '94109',
                    postalCode: '44041',
                    website: ['https://www.impots.gouv.fr'],
                  },
                },
              ] as Partial<Contact>[]),
          },
        },
      ],
    }),
  ],
} as Meta;

const Template: Story<ContactComponent> = (args: ContactComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  contactIds: ['unique-id-0'],
};

export const ManyContacts = Template.bind({});
ManyContacts.args = {
  contactIds: ['unique-id-1', 'unique-id-2', 'unique-id-3'],
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  name: 'Les contacts',
  contactIds: ['unique-id-4'],
};

export const ManyContactsWithTitle = Template.bind({});
ManyContactsWithTitle.args = {
  name: 'Les contacts',
  contactIds: ['unique-id-4', 'unique-id-5', 'unique-id-6'],
};
