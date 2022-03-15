import { Component, OnInit } from '@angular/core';
import { APageHome } from 'src/app/models/aPageHome';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.less']
})
export class AgeComponent extends APageHome  implements OnInit {

  ngOnInit(): void {
  }

}
