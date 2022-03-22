import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleASEComponent } from './article-ase.component';

describe('ArticleASEComponent', () => {
  let component: ArticleASEComponent;
  let fixture: ComponentFixture<ArticleASEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleASEComponent ]
    })
    .compileComponents();
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
