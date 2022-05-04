import { Component, OnInit } from '@angular/core';

import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { DateService } from '@/app/services/utils/date.service';

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

  loading: boolean = false;

  // field
  pseudo: string = '';

  date: Date | undefined;
  dateDay: string = '';
  dateMonth: string = '';
  dateYear: string = '';

  pwd: string = '';
  pwdConfirm: string = '';

  constructor(
    public lblService: LabelMngService,
    private _jcms: JcmsClientService,
    private _utilDate: DateService
  ) {}

  ngOnInit(): void {
    console.log('TODO');
  }

  public validStep(): boolean {
    if (this.step === 1) {
      if (this.pseudo) {
        this.processNexStep();
        // TODO update API
        /*
        this._jcms
          .get('plugins/zelli/member/pwd/' + this.pseudo)
          .subscribe({
            next: (rep) => {
              // TODO error
              this.processNexStep();
            },
            error: (error) => {
              console.log(error);
              this.loading = false;
            }
          });*/
        return false;
      }
    } else if (this.step === 2) {
      // test null => by DS ?
      this.date = new Date(
        ~~this.dateYear,
        ~~this.dateMonth - 1,
        ~~this.dateDay
      );

      if (this._utilDate.testDate(this.date)) {
        return true;
      } else {
        // TODO error
      }
    } else if (this.step === 3) {
      if (this.pwd && this.pwdConfirm && this.pwd === this.pwdConfirm) {
        return true;
      } else {
        // TODO error
      }
    }

    this.loading = false;
    return false;
  }

  public nextStep() {
    this.loading = true;

    if (!this.validStep()) {
      return;
    }

    this.processNexStep();
  }

  private processNexStep() {
    if (this.step >= this.maxStep) {
      // TODO end
    }

    this.step++;
    this.loading = false;
  }

  public lblBtnNext(): string {
    if (this.step >= this.maxStep) {
      return 'Créer mon compte';
    }
    return 'Suivant';
  }
}
