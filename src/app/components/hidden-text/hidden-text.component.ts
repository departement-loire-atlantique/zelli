import { Component, Input, OnInit } from '@angular/core';

/**
 * Class JS du DS 44
 */
declare class CollapserStandard {}

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

  btnLbl: string = HiddenTextComponent._readMore;

  constructor() {}

  ngOnInit(): void {
    new CollapserStandard();
  }

  onClick(event: Event): any {
    const btn: HTMLInputElement = event.target as HTMLInputElement;

    const lblBtn: HTMLInputElement = btn.querySelector(
      'SPAN'
    ) as HTMLInputElement;

    if (lblBtn.getAttribute('aria-expanded') === 'true') {
      this.btnLbl = HiddenTextComponent._readMore;
    } else {
      this.btnLbl = HiddenTextComponent._readLess;
    }
  }
}
