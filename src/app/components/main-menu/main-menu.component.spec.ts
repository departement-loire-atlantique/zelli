import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CatsHomeMngService } from '@/app/services/cats-home-mng.service';

import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '',
          },
        },
        {
          provide: CatsHomeMngService,
          useValue: {
            getCats: () => [
              {
                url: '/',
                icon: 'icon',
                smallTitle: 'Small title',
              },
            ],
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
