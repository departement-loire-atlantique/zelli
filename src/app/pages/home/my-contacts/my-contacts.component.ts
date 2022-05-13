import { Component, Injector, OnInit } from '@angular/core';

import { APageHome } from '@/app/models/aPageHome';

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.less'],
})
export class MyContactsComponent extends APageHome implements OnInit {
  isLoadingContacts = false;
  contactsIds = []; // TODO: use the correct type
  errorLoadingContacts = false;

  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit(): void {
    this.isLoadingContacts = true;
    // TODO: remove setTimeout, call correct endpoint
    setTimeout(() => {
      this.isLoadingContacts = false;
    }, 2000);
  }
}
