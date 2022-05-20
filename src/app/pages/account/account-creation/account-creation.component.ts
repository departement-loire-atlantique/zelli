import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { DesignSystemService } from '@/app/services/design-system.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';
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
    private _jcms: JcmsClientService,
    private _utilDate: DateService,
    private _ds: DesignSystemService
  ) {}

  ngAfterViewInit(): void {
    this._ds.initForm();
    this.formDisplay?.changes.subscribe((_) => {
      this._ds.initForm();
    });
  }

  /**
   * Validate curent step
   * @returns true if curent step is ok
   */
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
              // TODO error DS
              this.processNexStep();
            },
            error: (error) => {
              // TODO error DS
              console.log(error);
              this.loading = false;
            }
          });*/
        // valide step after result of WS
        return false;
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
      // TODO create update API
      this._jcms
        .put('plugins/zelli/member/pwd/' + this.pseudo, undefined, {
          params: {
            pwd: Buffer.from(this.pwd).toString('base64'),
          },
        })
        .subscribe({
          next: (rep) => {
            // TODO

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
