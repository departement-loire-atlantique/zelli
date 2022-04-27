import { Component, Injector, OnInit } from '@angular/core';

import { APageHome } from '@/app/models/aPageHome';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.less'],
})
export class QuestionsComponent extends APageHome implements OnInit {
  constructor(_injector: Injector) {
    super(_injector);
  }

  ngOnInit(): void {
    console.log('TODO');
  }
}
