import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CatsHomeMngService } from '@/app/services/cats-home-mng.service';

import { AgeComponent } from './age.component';

describe('AgeComponent', () => {
  let component: AgeComponent;
  let fixture: ComponentFixture<AgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgeComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/url',
          },
        },
        {
          provide: CatsHomeMngService,
          useValue: {
            getCatFromUrl: () => ({
              id: 'id',
              title: 'title',
              smallTitle: 'smallTitle',
              subTitle: 'subTitle',
              icon: 'icon',
              image: 'image',
              url: 'url',
              order: 0,
              idContentTrieur: 'idContentTrieur',
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
