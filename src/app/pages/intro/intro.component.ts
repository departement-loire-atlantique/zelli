import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from 'src/app/services/utils/date.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.less']
})
export class IntroComponent implements OnInit {

  private _lastAccess: Date;

  constructor(private router: Router, private dateUtil: DateService) {
    const strDate = JSON.parse(localStorage.getItem("_lastAccess") || "{}");
    this._lastAccess = new Date(strDate);
  }

  ngOnInit(): void {

    if (this.dateUtil.testDate(this._lastAccess)) {

      const curentDate = new Date();

      const diffM = this.dateUtil.monthDiff(this._lastAccess, curentDate);

      if (diffM <= 3) {
        this.router.navigate(["/themes"]);
      }
    }

    this.updateLastAccess();

  }

  private updateLastAccess() {
    localStorage.setItem("_lastAccess", JSON.stringify(new Date()));
  }

}
