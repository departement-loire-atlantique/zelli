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
declare class FormFieldInputAutoComplete {}
declare class FormFieldInputDatepicker {}
declare class FormFieldInputFile {}
declare class FormFieldInputStandard {}
declare class FormFieldInputTextarea {}

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
    new FormFieldInputAutoComplete();
    new FormFieldInputDatepicker();
    new FormFieldInputFile();
    new FormFieldInputStandard();
    new FormFieldInputTextarea();
  }
}
