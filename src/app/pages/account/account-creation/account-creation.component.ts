import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { DesignSystemService } from '@/app/services/design-system.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { LoginService } from '@/app/services/login.service';
import { FormInput } from '@/app/services/utils/form-input.service';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.less'],
})
export class AccountCreationComponent
  implements AfterViewInit, AfterViewChecked
{
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
  @Input() dateDay!: string;
  @Input() dateMonth!: string;
  @Input() dateYear!: string;

  pwd: string = '';
  pwdConfirm: string = '';

  accountCreate: boolean = false;
  isError: boolean = false;
  errorMsg!: string;
  pseudoErrorMsg: string =
    'Oups ! cet identifiant existe déjà dans zelli, merci d’en imaginer un autre';
  pseudoAccentErrorMsg: string =
    'Oups ! Merci de saisir ton prenom ou pseudo sans accent';
  dateErrorMsg: string = 'La date est postérieure à la date du jour';
  pwdErrorMsg: string =
    'Oups ! Tu n’as pas saisi la même chose dans les deux champs';
  pwdSpaceErrorMsg: string =
    'Oups ! Merci de saisir ton mot de passe sans espace (nous te recommandons de choisir un mot de passe avec au moins 12 caractères, avec des lettres, des chiffres et des caractères spéciaux comme le !)';
  pwdStrongErrorMsg: string =
    'Oups ! Merci de saisir un mot de passe plus fort (nous te recommandons de choisir un mot de passe avec au moins 12 caractères, avec des lettres, des chiffres et des caractères spéciaux comme le !)';

  @ViewChildren('formDisplay')
  formDisplay: QueryList<any> | undefined;

  constructor(
    public lblService: LabelMngService,
    public _login: LoginService,
    private _ds: DesignSystemService,
    private elByClassName: ElementRef,
    private _formInput: FormInput
  ) {}
  ngAfterViewChecked(): void {
    this._formInput.getAllInputCSS();
  }

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
    this.isError = false;
    this.errorMsg = '';
    console.log(this.isError);
    if (this.step === 1) {
      if (this.pseudo) {
        this.loading = true;

        /* Error accent */
        const rExp: RegExp = /[À-ú]/;
        if (rExp.test(this.pseudo)) {
          this.errorMsg = this.pseudoAccentErrorMsg;
          this.isError = true;
        } else {
          /* Pseudo exists */
          this._login.isMemberNotExist(this.pseudo, {
            class: this,
            func: this.callbackIsMemberNotExist,
          });
        }
      }
    } else if (this.step === 2) {
      if (this.dateYear && this.dateMonth && this.dateDay) {
        // field manual
        this.date = new Date(
          ~~this.dateYear,
          ~~this.dateMonth - 1,
          ~~this.dateDay
        );
      } else {
        // field by Design System
        const dateInput = (<HTMLElement>this.elByClassName.nativeElement)
          .querySelector('.ds44-input-value')!
          .getAttribute('value');
        if (dateInput) {
          this.date = new Date(
            ~~dateInput!.substring(0, 4),
            ~~dateInput!.substring(5, 7) - 1,
            ~~dateInput!.substring(8, 10)
          );
        }
      }
      /* Error custom date*/
      if (!this.date) {
        console.debug('Mauvais format de date');
      } else if (this.date > new Date()) {
        this.errorMsg = this.dateErrorMsg;
        this.isError = true;
      } else {
        return true;
      }
      this.dateDay = '';
      this.dateMonth = '';
      this.dateYear = '';
    } else if (this.step === 3) {
      /* Error space */
      const rExp: RegExp = /\s/;
      const strongPwd: RegExp =
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{12,})/;

      if (rExp.test(this.pwd)) {
        //espace
        this.errorMsg = this.pwdSpaceErrorMsg;
        this.isError = true;
      } else if (this.pwd !== this.pwdConfirm) {
        //pas pareil
        /* Error field different */
        this.errorMsg = this.pwdErrorMsg;
        this.isError = true;
      } else if (!strongPwd.test(this.pwd)) {
        //pas assez fort
        this.isError = true;
        this.errorMsg = this.pwdStrongErrorMsg;
      } else if (strongPwd.test(this.pwd) && strongPwd.test(this.pwdConfirm)) {
        return true;
      }
    }

    this.loading = false;
    return false;
  }

  /**
   *  button 'suivant'
   * @returns
   */
  public nextStep() {
    this.loading = true;
    if (!this.validStep()) {
      return;
    }
    this.processNexStep();
  }

  /**
   * Next step
   * @returns
   */
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
    this.errorMsg = this.pseudoErrorMsg;
    this.isError = !status;
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
