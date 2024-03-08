import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { Carousel, CarouselElement } from '@/app/models/jcms/carousel';
import { AppConfigService } from '@/app/services/app-config.service';
import { DesignSystemService } from '@/app/services/design-system.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { Util } from '@/app/util';

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

  isElementLoading: boolean = true;

  constructor(
    private _jcms: JcmsClientService,
    private _ds: DesignSystemService,
    private appConfigService: AppConfigService
  ) {}

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
      // this.pagerInit();
    });
  }

  private getFullElement() {
    if (!this.carousel || !this.carousel.elements1) {
      return;
    }
    const fullElements: Observable<CarouselElement>[] = [];

    for (let i = 0; i < this.carousel.elements1.length; i++) {
      let item = this.carousel.elements1[i];

      // array init with empty item (for order)
      this.elements.push(undefined);
      fullElements[i] = this._jcms.get<CarouselElement>('data/' + item.id);
    }

    combineLatest(fullElements).subscribe((reps) => {
      for (let i = 0; i < reps.length; i++) {
        let itRep: CarouselElement = reps[i];
        itRep.imageMobile =
          this.appConfigService.config.urlJcms + itRep.imageMobile;
        this.elements[i] = itRep;
      }

      // this.itemSwiper?.changes.subscribe((_) => {
      //   this.buildCarousel();
      // });

      this.isElementLoading = false;
    });
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

  public getLink(res: CarouselElement) {
    if (res.externalLink) {
      return res.externalLink;
    } else if (res.internalLink) {
      return Util.buildUrlCotent(res.internalLink);
    } else {
      return undefined;
    }
  }

  buildCarousel() {
    this._ds.initCarousel();
  }
}
