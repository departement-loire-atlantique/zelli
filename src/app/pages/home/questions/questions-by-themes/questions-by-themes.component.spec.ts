import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsByThemesComponent } from './questions-by-themes.component';

describe('QuestionsByThemesComponent', () => {
  let component: QuestionsByThemesComponent;
  let fixture: ComponentFixture<QuestionsByThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsByThemesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsByThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});