import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreByThemesComponent } from './explore-by-themes.component';

describe('ExploreByThemesComponent', () => {
  let component: ExploreByThemesComponent;
  let fixture: ComponentFixture<ExploreByThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreByThemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreByThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
