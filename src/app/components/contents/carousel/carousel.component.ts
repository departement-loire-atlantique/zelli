import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { Carousel, CarouselElement } from '@/app/models/jcms/carousel';
import { JcmsClientService } from '@/app/services/jcms-client.service';

import { environment } from '@/environments/environment';

/**
 * Class JS du DS 44
 */
declare class CarouselStandard {}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input()
  carousel: Carousel | undefined;

  @Input()
  id: string = '';

  @Input()
  text: string | undefined;

  elements: CarouselElement[] = [];

  @ViewChildren('itemSwiper')
  itemSwiper: QueryList<any> | undefined;

  constructor(private _jcms: JcmsClientService) {}

  ngOnInit(): void {
    if (!this.carousel && this.id) {
      this._jcms.get<Carousel>('data/' + this.id).subscribe((res: Carousel) => {
        this.carousel = res;
        this.getFullElement();
      });
    } else {
      this.getFullElement();
    }
  }

  ngAfterViewInit() {
    this.itemSwiper?.changes.subscribe((_) => {
      this.buildCarousel();
    });
  }

  private getFullElement() {
    if (!this.carousel || !this.carousel.elements1) {
      return;
    }
    for (let item of this.carousel.elements1) {
      this._jcms
        .get<CarouselElement>('data/' + item.id)
        .subscribe((res: CarouselElement) => {
          // TODO service fix img link
          res.imageMobile = environment.urlJcms + res.imageMobile;
          this.elements.push(res);
        });
    }
  }

  public buildCarousel() {
    new CarouselStandard();
  }
}
