import { Component, Input, OnInit } from '@angular/core';
import { Carousel } from 'src/app/models/jcms/carousel';
import { JcmsClientService } from 'src/app/services/jcms-client.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {

  @Input()
  carousel: Carousel | undefined;

  @Input()
  id: string = "";

  @Input("text")
  diaporamaTexte: string | undefined;

  constructor(private _jcms: JcmsClientService) { }

  ngOnInit(): void {
    if(!this.carousel && this.id){
      this._jcms.get<Carousel>("data/"+ this.id).subscribe((res : Carousel) => this.carousel = res);
    }
  }

}
