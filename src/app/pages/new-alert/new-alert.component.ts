import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Alerte } from '@/app/models/jcms/alerte';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.less'],
})
export class NewAlertComponent implements OnInit {
  private _event?: Alerte;

  //fields
  subject: string = '';

  dateDay: string = '';
  dateMonth: string = '';
  dateYear: string = '';

  comment: string = '';

  addCalendar: boolean = false;

  sendAlert: boolean = true;

  constructor(
    public lblService: LabelMngService,
    private _jcms: JcmsClientService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    console.log('TODO new alert');
  }

  public newAlert() {
    if (!this.subject || !this.dateYear || !this.dateMonth || !this.dateDay) {
      // TODO error DS
      return;
    }

    //TODO date after day

    this._event = new Alerte(
      this.subject,
      this.dateDay,
      this.dateMonth,
      this.dateYear,
      this.comment,
      this.sendAlert
    );

    this.saveAlert();

    this.createIcs();
  }

  private saveAlert() {
    if (this._event) {
      let urlEncodedData = this._jcms.encodeParamForBody(
        this._event.buildForSendApi()
      );

      this._jcms.post('data/AlerteZelli', urlEncodedData).subscribe({
        next: (rep) => {
          this._location.back();
        },
        error: (error) => {
          console.error(error);

          // TODO error DS
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
