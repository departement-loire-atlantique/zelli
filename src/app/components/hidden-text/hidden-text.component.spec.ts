import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenTextComponent } from './hidden-text.component';

describe('HiddenTextComponent', () => {
  let component: HiddenTextComponent;
  let fixture: ComponentFixture<HiddenTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiddenTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
