import { Component, OnInit } from '@angular/core';

import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { LoginService } from '@/app/services/login.service';
import { DateService } from '@/app/services/utils/date.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.less'],
})
export class AccountCreationComponent {
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

  accountCreate: boolean = false;

  constructor(
    public lblService: LabelMngService,
    private _jcms: JcmsClientService,
    private _utilDate: DateService,
    public login: LoginService
  ) {}

  /**
   * Validate current step
   * @returns true if current step is ok
   */
  public validStep(): boolean {
    if (this.step === 1) {
      if (this.pseudo) {
        this._jcms.get('plugins/zelli/member/pwd/' + this.pseudo).subscribe({
          next: (rep: any) => {
            type reponseJson = {
              success: string;
            };
            const result = rep as reponseJson;
            if (
              typeof result.success === 'string' &&
              result.success.includes("Le membre indiqué n'existe pas.")
            ) {
              this.loading = true;
              this.processNexStep();
              return false;
            }
            // TODO error DS
            console.log("Le pseudo n'est pas valide");
            return true;
          },
          error: (error) => {
            // TODO error DS
            console.log(error);
          },
        });
      }
    } else if (this.step === 2) {
      // test null => by DS ?
      this.date = new Date(
        ~~this.dateYear,
        ~~this.dateMonth - 1,
        ~~this.dateDay
      );
      if (
        this.dateYear.length > 0 &&
        this.dateMonth.length > 0 &&
        this.dateDay.length > 0 &&
        this._utilDate.testDate(this.date) &&
        this.date < new Date()
      ) {
        return true;
      } else {
        // TODO error DS
        console.log("La date n'est pas valide");
      }
    } else if (this.step === 3) {
      if (this.pwd && this.pwdConfirm && this.pwd === this.pwdConfirm) {
        return true;
      } else {
        // TODO error DS
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
    // if end => create account
    if (this.step >= this.maxStep) {
      let body = new URLSearchParams();
      body.set('login', Buffer.from(this.pseudo).toString('base64'));
      body.set(
        'dateNaissance',
        this.date === undefined ? '' : this.date.getTime().toString()
      );
      body.set('pwd', Buffer.from(this.pwd).toString('base64'));
      this._jcms
        .post('plugins/zelli/member/create', body.toString())
        .subscribe({
          next: (rep: any) => {
            // TODO
            console.log(rep);
            type reponseJson = {
              token: string;
            };
            const result = rep as reponseJson;
            localStorage.setItem('_loginPersoToken', result.token);
            // if ok
            this.accountCreate = true;
          },
          error: (error) => {
            // TODO error
            console.log(error);
            this.loading = false;

            // TODO sup
            this.accountCreate = true;
          },
        });
      return;
    }
    //else next step

    this.step++;
    this.loading = false;
  }

  public lblBtnNext(): string {
    if (this.step >= this.maxStep) {
      return this.lblService.getLbl('accountCreateBtnEnd');
    }
    return this.lblService.getLbl('accountCreateBtnNextStep');
  }

  public customReturn(): boolean {
    return this.step > 1;
  }

  public prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }
}
