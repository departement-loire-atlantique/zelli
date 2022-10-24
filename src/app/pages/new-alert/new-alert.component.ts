import { Location } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Alerte, AlerteApi } from '@/app/models/jcms/alerte';
import { DesignSystemService } from '@/app/services/design-system.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { FormInput } from '@/app/services/utils/form-input.service';
import { TitlePage } from '@/app/services/utils/title-page.service';

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.less'],
})
export class NewAlertComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  private _isUpdate: boolean = false;
  private _idAlertUpdate: string = '';

  private _event?: Alerte;

  //fields
  subject: string = '';

  dateDay: string = '';
  dateMonth: string = '';
  dateYear: string = '';

  comment: string = '';

  btnAddAlerte: string = "Créer l'alerte";

  addCalendar: boolean = false;

  sendAlert: boolean = true;

  process: boolean = false;

  constructor(
    public lblService: LabelMngService,
    private _jcms: JcmsClientService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _ds: DesignSystemService,
    private elByClassName: ElementRef,
    private titleService: Title,
    private _formInput: FormInput,
    titlePage: TitlePage
  ) {
    this.titleService.setTitle(titlePage.getTitle('Alerte'));
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.btnAddAlerte = "Modifier l'alerte";
        this._isUpdate = true;
        this._idAlertUpdate = idParam;
        this._jcms.get<AlerteApi>('data/' + idParam).subscribe((rep) => {
          this.subject = rep.title;
          this.comment = rep.description;

          const date = new Date(rep.edate);

          this.dateDay = date.getDate().toString();
          if (this.dateDay.length <= 1) {
            this.dateDay = '0' + this.dateDay;
          }

          this.dateMonth = (date.getMonth() + 1).toString();
          if (this.dateMonth.length <= 1) {
            this.dateMonth = '0' + this.dateMonth;
          }

          this.dateYear = date.getFullYear().toString();
        });
      }
    });
  }

  ngAfterViewInit() {
    this._ds.initForm();
  }

  ngAfterViewChecked(): void {
    this._formInput.getAllInputCSS();
  }

  public newAlert() {
    this.process = true;

    // Test subject
    if (!this.subject) {
      // TODO error DS
      this.process = false;
      return;
    }

    // Test Date
    if (!this.dateYear || !this.dateMonth || !this.dateDay) {
      // field by Design System
      const dateInput = (<HTMLElement>this.elByClassName.nativeElement)
        .querySelector('#new-alert-date .ds44-input-value')!
        .getAttribute('value');
      if (dateInput) {
        this.dateYear = dateInput.substring(0, 4);
        this.dateMonth = dateInput.substring(5, 7);
        this.dateDay = dateInput.substring(8, 10);
      }
    }

    if (
      new Date() >=
      new Date(~~this.dateYear, ~~this.dateMonth - 1, ~~this.dateDay)
    ) {
      console.error('Sélectionner une date de rappel dans le future ');

      // TODO error DS
      this.process = false;
      return;
    }

    // Create event
    this._event = new Alerte(
      this.subject,
      this.dateDay,
      this.dateMonth,
      this.dateYear,
      this.comment,
      this.sendAlert
    );

    this.saveAlert();
  }

  private saveAlert() {
    if (this._event) {
      let urlEncodedData = this._jcms.encodeParamForBody(
        this._event.buildForSendApi()
      );

      let endpoint = 'data/AlerteZelli';
      if (this._isUpdate) {
        endpoint = 'data/' + this._idAlertUpdate;
      }
      this._jcms.post(endpoint, urlEncodedData).subscribe({
        next: (rep) => {
          this.process = false;
          this.createIcs();
          this._location.back();
        },
        error: (error) => {
          console.error(error);

          // TODO error DS
          this.process = false;
        },
      });
    }
  }

  private createIcs() {
    if (!this.addCalendar) {
      return;
    }
    let blob = this._event?.createIcs();
    if (blob) {
      window.open(window.URL.createObjectURL(blob));
    }
  }
}
