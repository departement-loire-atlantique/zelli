import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

import { CatsMngService } from '@/app/services/cats-mng.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';

import { KeepDocComponent } from './keep-doc.component';

describe('KeepDocComponent', () => {
  let component: KeepDocComponent;
  let fixture: ComponentFixture<KeepDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeepDocComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: from([]),
          },
        },
        {
          provide: JcmsClientService,
          useValue: {
            get: () => from([]),
          },
        },
        {
          provide: CatsMngService,
          useValue: {
            cat: () => from([]),
          },
        },
      ],
    }).compileComponents();
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
