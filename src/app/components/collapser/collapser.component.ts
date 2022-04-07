import { AfterViewInit, Component, Input } from '@angular/core';

/**
 * Class JS du DS 44
 */
declare class CollapserStandard {}

@Component({
  selector: 'app-collapser',
  templateUrl: './collapser.component.html',
  styleUrls: ['./collapser.component.less'],
})
export class CollapserComponent implements AfterViewInit {
  @Input()
  dataTitle: string[] | undefined;

  @Input()
  dataVal: string[] | undefined;

  prefixId: string =
    'collapser-' + Math.random().toString().replace('.', '') + '-';

  ngAfterViewInit(): void {
    new CollapserStandard();
  }

  dynamiqueAddInnerHTML(i: number, id: string) {
    const div = document.querySelector('#' + id);
    if (div) {
      div.innerHTML = this.dataVal ? this.dataVal[i] : '';
    }
  }
}
