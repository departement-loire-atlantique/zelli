import { Injectable } from '@angular/core';

/**
 * Class JS du DS 44
 */
declare class CollapserStandard {}
declare class CarouselStandard {}
declare class OverlayStandard {
  constructor(_: any);
}
// Form
declare class FormFieldInputStandard {}

@Injectable({
  providedIn: 'root',
})
export class DesignSystemService {
  constructor() {}

  public initCollapser() {
    new CollapserStandard();
  }

  public initCarousel() {
    new CarouselStandard();
  }

  public initOverlay() {
    new OverlayStandard(
      '[data-js="ds44-modal"]:not([data-target="#overlay-mosaique"])'
    );
  }

  public initForm() {
    new FormFieldInputStandard();
  }
}
