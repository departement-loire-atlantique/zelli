import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { from } from 'rxjs';

import { CatsHomeMngService } from '@/app/services/cats-home-mng.service';
import { CatsMngService } from '@/app/services/cats-mng.service';

import { ExploreByThemesComponent } from './explore-by-themes.component';

describe('ExploreByThemesComponent', () => {
  let component: ExploreByThemesComponent;
  let fixture: ComponentFixture<ExploreByThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreByThemesComponent],
      providers: [
        {
          provide: CatsMngService,
          useValue: {
            catsChildren: () => from([]),
          },
        },
        Injector,
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
    fixture = TestBed.createComponent(ExploreByThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
