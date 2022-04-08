import { Component, Input } from '@angular/core';

type AlertStatus = 'info' | 'error' | 'success';

/**
 * This component should be used to go back to the previous page.
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
})
export class AlertComponent {
  @Input()
  description?: string;

  @Input()
  status: AlertStatus = 'info';

  constructor() {}
}
