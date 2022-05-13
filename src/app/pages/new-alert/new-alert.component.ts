import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.less'],
})
export class NewAlertComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('TODO new alert');
  }
}
