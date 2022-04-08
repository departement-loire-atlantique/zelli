import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

import { Category } from '@/app/models/jcms/category';
import { CatsHomeMngService } from '@/app/services/cats-home-mng.service';
import { CatsMngService } from '@/app/services/cats-mng.service';
import { LabelMngService } from '@/app/services/label-mng.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '',
          },
        },
        {
          provide: CatsMngService,
          useValue: {
            catsChildren: () => from([]),
          },
        },
        {
          provide: CatsHomeMngService,
          useValue: {
            setAllCats: () => {},
          },
        },
        {
          provide: LabelMngService,
          useValue: {
            initAllLbl: () => from([]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
