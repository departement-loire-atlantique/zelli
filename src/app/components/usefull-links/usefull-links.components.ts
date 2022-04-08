import { Component, Input } from '@angular/core';

type Link = {
  label: string;
  link: string;
};

@Component({
  selector: 'app-usefull-links',
  templateUrl: './usefull-links.components.html',
  styleUrls: ['./usefull-links.components.less'],
})
export default class UsefullLinksComponent {
  @Input()
  links!: Link[];

  @Input()
  iconUrl = '👇';

  @Input()
  title = 'Les liens utiles';

  @Input()
  backgroundColor = 'yellow';
}
