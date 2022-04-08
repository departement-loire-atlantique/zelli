import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

import { CatsMngService } from '@/app/services/cats-mng.service';
import { LabelMngService } from '@/app/services/label-mng.service';

import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'id',
              },
            },
          },
        },
        {
          provide: CatsMngService,
          useValue: {
            cat: () => from([]),
            catsChildren: () => from([]),
          },
        },
        {
          provide: LabelMngService,
          useValue: {
            lblDocTrieur: 'lblDocTrieur',
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
