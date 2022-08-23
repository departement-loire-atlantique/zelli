import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DesignSystemService } from '@/app/services/design-system.service';
import { LabelMngService } from '@/app/services/label-mng.service';

@Component({
  selector: 'app-pwd-reset',
  templateUrl: './pwd-reset.component.html',
  styleUrls: ['./pwd-reset.component.less'],
})
export class PwdResetComponent implements OnInit, AfterViewInit {
  pseudo: string = '';

  process: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    public lblService: LabelMngService,
    private _ds: DesignSystemService
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
    console.log('TODO');
  }
}
