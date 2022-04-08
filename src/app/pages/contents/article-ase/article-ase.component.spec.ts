import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

import { JcmsClientService } from '@/app/services/jcms-client.service';

import { ArticleASEComponent } from './article-ase.component';

describe('ArticleASEComponent', () => {
  let component: ArticleASEComponent;
  let fixture: ComponentFixture<ArticleASEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleASEComponent],
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleASEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
