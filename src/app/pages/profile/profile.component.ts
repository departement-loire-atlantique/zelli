import { DatePipe } from '@angular/common';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from '@/app/components/list/list.component';
import { JcmsPager } from '@/app/core/jcmsPager';
import { AlerteApi } from '@/app/models/jcms/alerte';
import { Member } from '@/app/models/jcms/member';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LoginService } from '@/app/services/login.service';
import { Util } from '@/app/util';

import { environment } from '@/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
  profil?: Member;

  edit: boolean = false;
  //field
  email: string = '';
  phone: string = '';
  address: string = '';

  photoFile?: File;

  // alertes
  loadAlert: boolean = true;
  alertes: Item[] | undefined;
  pagerAlertes: JcmsPager<AlerteApi> | undefined;

  constructor(
    public login: LoginService,
    private _jcms: JcmsClientService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.login.profil.subscribe((rep) => {
      this.profil = rep;
      this.email = rep && rep.email ? rep.email : '';
      this.phone = rep && rep.phone ? rep.phone : '';
      this.address = rep && rep.address ? rep.address : '';
    });

    this.processAlertesResult(
      this._jcms.getPager<AlerteApi>('search', {
        params: {
          types: ['AlerteZelli'],
          exactType: true,
          pstatus: 2,
          // TODO filtre edate
        },
      })
    );
  }

  public getProfileImg(): string {
    if (this.profil && this.profil.photo) {
      return environment.urlJcms + this.profil.photo;
    }
    return 'assets/images/svg/icone-profil.svg';
  }

  public onChangeFile(event: any) {
    this.photoFile = event.srcElement.files[0];
  }

  public editPhoto() {
    if (this.photoFile) {
      this.login.updatePhoto(this.photoFile);
      this.photoFile = undefined;
      // close overlay
      document.getElementById('edit-photo-close')?.click();
    }
  }

  public toggleEditInfos() {
    this.edit = !this.edit;
  }

  public editInfo() {
    this.edit = false; // TODO if ok
    this.login.updateInfos({
      email: this.email,
      phone: this.phone,
      address: this.address,
    });
  }

  // --------------
  // ALERTES

  public processAlertesResult(obs: Observable<JcmsPager<AlerteApi>>) {
    this.loadAlert = true;
    obs.subscribe((pager: JcmsPager<AlerteApi>) => {
      if (!this.alertes) {
        this.alertes = [];
      }

      this.pagerAlertes = pager;

      const contents = pager.dataInPage;

      for (let itContent of contents) {
        this.alertes.push({
          lbl: itContent.title,
          prefix: this._datePipe.transform(itContent.edate, 'mediumDate') || '',
          url: Util.buildUrlCotent(itContent),
        });
      }

      this.loadAlert = false;
    });
  }

  public moreAlertes() {
    if (this.pagerAlertes) {
      this.processAlertesResult(this.pagerAlertes.next());
    }
  }
}
