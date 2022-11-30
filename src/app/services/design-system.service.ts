import { Injectable } from '@angular/core';

/**
 * Class JS du DS 44
 */
declare class MiscForm {
  static isEmail(email: string): boolean;
}
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
declare class FormLayoutStandard {}
declare class FormLayoutInline {}
declare class FormLayoutObligationAlimentaire {}

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

    new FormLayoutInline();
    new FormLayoutObligationAlimentaire();
    new FormLayoutStandard();
  }

  public isEmail(email: string): boolean {
    return MiscForm.isEmail(email);
  }
}
