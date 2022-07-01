import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleCustomComponent } from './page-title-custom.component';

describe('PageTitleCustomComponent', () => {
  let component: PageTitleCustomComponent;
  let fixture: ComponentFixture<PageTitleCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageTitleCustomComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
