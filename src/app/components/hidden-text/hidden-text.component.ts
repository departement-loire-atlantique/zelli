import { Component, Input, OnInit } from '@angular/core';

import { DesignSystemService } from '@/app/services/design-system.service';

@Component({
  selector: 'app-hidden-text',
  templateUrl: './hidden-text.component.html',
  styleUrls: ['./hidden-text.component.less'],
})
export class HiddenTextComponent implements OnInit {
  private static _readMore: string = 'Lire la version texte';
  private static _readLess: string = 'Masquer la version texte';

  @Input()
  text: string | undefined;

  ariaExpanded = false;
  btnLbl: string = HiddenTextComponent._readMore;

  constructor(private _ds: DesignSystemService) {}

  ngOnInit(): void {
    this._ds.initCollapser();
  }

  onClick(event: Event): any {
    const btn: HTMLInputElement = event.currentTarget as HTMLInputElement;

    const lblBtn: HTMLInputElement = btn.querySelector(
      'SPAN'
    ) as HTMLInputElement;

    if (lblBtn.getAttribute('aria-expanded') === 'true') {
      this.ariaExpanded = false;
      this.btnLbl = HiddenTextComponent._readMore;
    } else {
      this.ariaExpanded = true;
      this.btnLbl = HiddenTextComponent._readLess;
    }
  }
}
