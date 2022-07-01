import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionFormComponent } from './ask-question-form.component';

describe('QuestionsByThemesComponent', () => {
  let component: AskQuestionFormComponent;
  let fixture: ComponentFixture<AskQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AskQuestionFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
