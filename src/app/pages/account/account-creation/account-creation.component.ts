import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { DesignSystemService } from '@/app/services/design-system.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { LoginService } from '@/app/services/login.service';
import { DateService } from '@/app/services/utils/date.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.less'],
})
export class AccountCreationComponent implements AfterViewInit {
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

  @ViewChildren('formDisplay')
  formDisplay: QueryList<any> | undefined;

  constructor(
    public lblService: LabelMngService,
    private _utilDate: DateService,
    public _login: LoginService,
    private _ds: DesignSystemService
  ) {}

  ngAfterViewInit(): void {
    this._ds.initForm();
    this.formDisplay?.changes.subscribe((_) => {
      this._ds.initForm();
    });
  }

  /**
   * Validate current step
   * @returns true if current step is ok
   */
  public validStep(): boolean {
    if (this.step === 1) {
      if (this.pseudo) {
        this.loading = true;
        this._login.isMemberNotExist(this.pseudo, {
          class: this,
          func: this.callbackIsMemberNotExist,
        });
      }
    } else if (this.step === 2) {
      if (this.dateYear && this.dateMonth && this.dateDay) {
        this.date = new Date(
          ~~this.dateYear,
          ~~this.dateMonth - 1,
          ~~this.dateDay
        );

        if (this._utilDate.testDate(this.date)) {
          return true;
        } else {
          // TODO error DS
        }
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
      this._login.createMember(
        this.pseudo,
        this.date === undefined ? '' : this.date.getTime().toString(),
        this.pwd,
        {
          class: this,
          func: this.callbackCreateMember,
        }
      );
      return;
    }
    //else next step

    this.step++;
    this.loading = false;
  }

  private callbackIsMemberNotExist(status: boolean, msg?: string): boolean {
    if (status) {
      this.processNexStep();
      return false;
    }
    return true;
  }

  private callbackCreateMember(status: boolean, msg?: string) {
    this.accountCreate = status;
    this.loading = status;
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
