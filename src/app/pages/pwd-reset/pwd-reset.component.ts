import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DesignSystemService } from '@/app/services/design-system.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { LabelMngService } from '@/app/services/label-mng.service';

@Component({
  selector: 'app-pwd-reset',
  templateUrl: './pwd-reset.component.html',
  styleUrls: ['./pwd-reset.component.less'],
})
export class PwdResetComponent implements OnInit, AfterViewInit {
  pseudo: string = '';

  process: boolean = false;

  resetOk: boolean = false;
  error: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    public lblService: LabelMngService,
    private _ds: DesignSystemService,
    private _jcms: JcmsClientService
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.pseudo = params.get('pseudo') || '';
    });
  }

  ngAfterViewInit(): void {
    this._ds.initForm();
  }

  public reset() {
    this.process = true;
    this.resetOk = false;
    this.error = false;

    this._jcms.get('plugins/zelli/member/reset/pwd/' + this.pseudo).subscribe({
      next: (rep) => {
        this.process = false;
        this.resetOk = true;
      },
      error: (error) => {
        console.error(error);

        // TODO error DS
        this.process = false;
        this.error = true;
      },
    });
  }
}
