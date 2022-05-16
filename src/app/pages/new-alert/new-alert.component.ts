import { Component, OnInit } from '@angular/core';

import { LabelMngService } from '@/app/services/label-mng.service';

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.less'],
})
export class NewAlertComponent implements OnInit {
  constructor(public lblService: LabelMngService) {}

  ngOnInit(): void {
    console.log('TODO new alert');
  }
}
