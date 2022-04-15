import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';

import { SubThemeComponent } from './sub-theme.component';

describe('SubThemeComponent', () => {
  let component: SubThemeComponent;
  let fixture: ComponentFixture<SubThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubThemeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'subId',
              },
            },
          },
        },
        {
          provide: CatsMngService,
          useValue: {
            cat: () => from([]),
          },
        },
        {
          provide: JcmsClientService,
          useValue: {
            get: () => from([]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
