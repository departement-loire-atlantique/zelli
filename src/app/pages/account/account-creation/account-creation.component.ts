import { Component, OnInit } from '@angular/core';

import { LabelMngService } from '@/app/services/label-mng.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.less'],
})
export class AccountCreationComponent implements OnInit {
  step: number = 1;

  maxStep: number = 3;

  titleByStep: string[] = [
    'accountCreateStep1',
    'accountCreateStep2',
    'accountCreateStep3',
  ];

  constructor(public lblService: LabelMngService) {}

  ngOnInit(): void {
    console.log('TODO');
  }

  public nextStep() {
    // TODO test curent step
    if (this.step >= this.maxStep) {
      // TODO end
    }
    this.step++;
  }

  public lblBtnNext(): string {
    if (this.step >= this.maxStep) {
      return 'Créer mon compte';
    }
    return 'Suivant';
  }
}
