import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  styleUrls: ['./pagination.component.less'],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input()
  currentPage!: number;

  @Input()
  totalPage!: number;
}
