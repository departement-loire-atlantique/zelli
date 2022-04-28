import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Content } from '@/app/models/jcms/content';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';
import { Util } from '@/app/util';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
})
export class WelcomeComponent implements OnInit {
  dataInFooter: Content | undefined;

  constructor(
    private _router: Router,
    private _jcms: JcmsClientService,
    public lblService: LabelMngService
  ) {}

  ngOnInit(): void {
    // TODO test connected / skip => intro
    // this._router.navigate(['/intro']);
    // return

    this._jcms
      .get<any>('plugins/zelli/prop/jcmsplugin.zelli.lbl.welcome.footer.link')
      .subscribe((rep: any) => {
        this._jcms.get<Content>('data/' + rep.value).subscribe((rep) => {
          this.dataInFooter = rep;
        });
      });
  }

  public getLinkInFooter() {
    if (this.dataInFooter) {
      return Util.buildUrlCotent(this.dataInFooter);
    }
    return '';
  }
}
