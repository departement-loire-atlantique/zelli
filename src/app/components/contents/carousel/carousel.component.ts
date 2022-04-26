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

  elements: (CarouselElement | undefined)[] = [];

  @ViewChildren('itemSwiper')
  itemSwiper: QueryList<any> | undefined;

  private _obsPager: MutationObserver | undefined;

  curentSlide: number = 1;

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
      this.pagerInit();
    });
  }

  private getFullElement() {
    if (!this.carousel || !this.carousel.elements1) {
      return;
    }
    for (let i = 0; i < this.carousel.elements1.length; i++) {
      let item = this.carousel.elements1[i];

      // array init with empty item (for order)
      this.elements.push(undefined);

      this._jcms
        .get<CarouselElement>('data/' + item.id)
        .subscribe((res: CarouselElement) => {
          // TODO service fix img link
          res.imageMobile = environment.urlJcms + res.imageMobile;
          this.elements[i] = res;
        });
    }
  }

  public buildCarousel() {
    new CarouselStandard();
  }

  public pagerInit() {
    this._obsPager = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'aria-current'
        ) {
          const target = <Element>mutation.target;
          const ariaCurrent = target.getAttribute('aria-current');
          console.log(target);
          if (ariaCurrent == 'true') {
            this.curentSlide =
              ~~('' + target.getAttribute('data-swiper-slide-index')) + 1;
          }
        }
      }
    });
    document
      .querySelectorAll('.c-carousel LI.swiper-slide:not(.obs-curent)')
      .forEach((node) => {
        node.classList.add('obs-curent');
        this._obsPager?.observe(node, { attributes: true });
      });
  }
}
