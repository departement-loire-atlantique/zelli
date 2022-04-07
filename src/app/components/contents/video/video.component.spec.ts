import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { from } from 'rxjs';

import { JcmsClientService } from '@/app/services/jcms-client.service';

import { VideoComponent } from './video.component';

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoComponent],
      providers: [
        {
          provide: JcmsClientService,
          useValue: {
            get: () =>
              from([
                {
                  id: 'c_5250',
                  title: 'Rick Asley - Never Gonna Give You Up',
                  class: 'generated.ArticleASE',
                  urlVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                  imagePrincipale: '',
                },
              ]),
          },
        },
        DomSanitizer,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
