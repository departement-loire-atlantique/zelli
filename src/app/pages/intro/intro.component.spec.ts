import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DateService } from '@/app/services/utils/date.service';

import { IntroComponent } from './intro.component';

describe('IntroComponent', () => {
  let component: IntroComponent;
  let fixture: ComponentFixture<IntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntroComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: () => Promise.resolve(true),
          },
        },
        DateService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
