import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-research-btn',
  templateUrl: './research-btn.component.html',
  styleUrls: ['./research-btn.component.less'],
})
export class ResearchBtnComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    document.getElementById('research')?.focus();
  }
}
