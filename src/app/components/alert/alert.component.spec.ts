import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from '@/app/components/alert/alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.description = 'This is a description';
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
