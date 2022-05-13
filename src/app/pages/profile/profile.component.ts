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

  photoFile?: File;

  constructor(public login: LoginService) {}

  ngOnInit(): void {
    console.log('TODO profile');
    this.login.profil.subscribe((rep) => {
      this.profil = rep;
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
}
