import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasHelpedComponent } from './has-helped.component';

describe('HasHelpedComponent', () => {
  let component: HasHelpedComponent;
  let fixture: ComponentFixture<HasHelpedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HasHelpedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HasHelpedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
