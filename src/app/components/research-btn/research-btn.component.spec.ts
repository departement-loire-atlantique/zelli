import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchBtnComponent } from './research-btn.component';

describe('ResearchBtnComponent', () => {
  let component: ResearchBtnComponent;
  let fixture: ComponentFixture<ResearchBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResearchBtnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
