import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.less']
})
export class IntroComponent implements OnInit {

  private _lastAccess: Date;

  constructor(private router: Router) {
    const strDate = JSON.parse(localStorage.getItem("_lastAccess") || "{}");
    this._lastAccess = new Date(strDate);
  }

  ngOnInit(): void {
    // TODO test date
    this.router.navigate(["/themes"]);
  }

}
