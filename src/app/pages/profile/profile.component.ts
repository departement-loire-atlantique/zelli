import { Component, OnInit } from '@angular/core';

import { Member } from '@/app/models/jcms/member';
import { LoginService } from '@/app/services/login.service';

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

  constructor(public login: LoginService) {}

  ngOnInit(): void {
    this.login.profil.subscribe((rep) => {
      this.profil = rep;
      this.email = rep && rep.email ? rep.email : '';
      this.phone = rep && rep.phone ? rep.phone : '';
      this.address = rep && rep.address ? rep.address : '';
    });
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
}
