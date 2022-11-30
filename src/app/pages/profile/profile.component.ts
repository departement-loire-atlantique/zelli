import { DatePipe } from '@angular/common';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Item } from '@/app/components/list/list.component';
import { JcmsPager } from '@/app/core/jcmsPager';
import { AlerteApi } from '@/app/models/jcms/alerte';
import { Member } from '@/app/models/jcms/member';
import { DesignSystemService } from '@/app/services/design-system.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LoginService } from '@/app/services/login.service';
import { FormInput } from '@/app/services/utils/form-input.service';
import { TitlePage } from '@/app/services/utils/title-page.service';
import { Util } from '@/app/util';

import { environment } from '@/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  profil?: Member;

  fromCreate: boolean = false;

  edit: boolean = false;
  //field
  email: string = '';
  phone: string = '';
  address: string = '';

  editPhoto: boolean = false;
  photoFile?: File;

  // alertes
  loadAlert: boolean = true;
  alertes: Item[] | undefined;
  pagerAlertes: JcmsPager<AlerteApi> | undefined;

  updateError: boolean = false;
  updateErrorMsg?: string;

  @ViewChildren('formEndDisplay')
  formEndDisplay: QueryList<any> | undefined;

  featAlert: boolean = environment.features.customAlerts;
  featEditPhoto: boolean = environment.features.editPhoto;

  constructor(
    public login: LoginService,
    private _route: ActivatedRoute,
    private _jcms: JcmsClientService,
    private _datePipe: DatePipe,
    private _ds: DesignSystemService,
    private elByClassName: ElementRef,
    private _router: Router,
    private _formInput: FormInput,
    private titleService: Title,
    titlePage: TitlePage
  ) {
    this.titleService.setTitle(titlePage.getTitle('Profil'));
  }

  ngAfterViewChecked(): void {
    this._formInput.getAllInputCSS();
  }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.fromCreate = JSON.parse(params.get('fromCreate') || 'false');
    });

    this.login.profil.subscribe((rep) => {
      this.profil = rep;
      this.email = rep && rep.email ? rep.email : '';
      this.phone = rep && rep.phone ? rep.phone : '';
      this.address = rep && rep.address ? rep.address : '';
    });

    let idMember = this.login.getProfilId();
    if (idMember && this.featAlert) {
      this.processAlertesResult(
        this._jcms.getPager<AlerteApi>('search', {
          params: {
            types: ['AlerteZelli'],
            exactType: true,
            pstatus: 2,
            mids: idMember,
            // TODO filtre edate
          },
        })
      );
    }
  }

  ngAfterViewInit(): void {
    this._ds.initOverlay();
    this.formEndDisplay?.changes.subscribe((_) => {
      this._ds.initForm();
    });
  }

  public getProfileImg(): string {
    if (this.profil && this.profil.photo) {
      return environment.urlJcms + this.profil.photo;
    }
    return 'assets/images/svg/icone-profil.svg';
  }

  public toggleEditPhoto() {
    this.editPhoto = !this.editPhoto;
  }

  public onChangeFile(event: any) {
    this.photoFile = event.srcElement.files[0];
  }

  public subEditPhoto() {
    if (this.photoFile) {
      this.login.updatePhoto(this.photoFile);
      this.photoFile = undefined;
      // close overlay
      document.getElementById('edit-photo-close')?.click();
    }
  }

  public toggleEditInfos() {
    this.updateError = false;
    this.edit = !this.edit;
  }

  public editInfo() {
    this.edit = false; // TODO if ok

    if (!this.email || !this._ds.isEmail(this.email)) {
      this.edit = true;
      return;
    }
    if (this.phone && !this._ds.isPhone(this.phone)) {
      this.edit = true;
      return;
    }

    const addrField = (<HTMLElement>this.elByClassName.nativeElement)
      .querySelector('.field-address .ds44-input-value')!
      .getAttribute('value');
    if (addrField || addrField === '') {
      this.address = addrField;
    }

    let updateLogin = this.login.updateInfos({
      email: this.email,
      phone: this.phone,
      address: this.address,
    });

    if (updateLogin)
      updateLogin.subscribe({
        next: () => {
          this.login.testToken(); // For update local member infos
        },
        error: (e) => {
          this.updateError = true;
          this.updateErrorMsg =
            'Il existe déjà un compte avec cette adresse mail.';
        },
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

  // --------------

  public returnFromCreate() {
    this._router.navigate(['/themes/']);
  }
}
