import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepDocComponent } from './keep-doc.component';

describe('KeepDocComponent', () => {
  let component: KeepDocComponent;
  let fixture: ComponentFixture<KeepDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeepDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
