import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionSendComponent } from './ask-question-send.component';

describe('AskQuestionSendComponent', () => {
  let component: AskQuestionSendComponent;
  let fixture: ComponentFixture<AskQuestionSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AskQuestionSendComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskQuestionSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
