import { Component, Injector, OnInit } from '@angular/core';

import { APageHome } from '@/app/models/aPageHome';

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.less'],
})
export class MyContactsComponent extends APageHome implements OnInit {
  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit(): void {
    console.log('TODO');
  }
}
