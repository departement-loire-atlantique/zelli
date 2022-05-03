import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-page-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less'],
})
export class PageContactComponent implements OnInit, OnDestroy {
  contactId$ = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('contactId') ?? undefined)
  );

  private subscription?: Subscription;

  contactId?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private init() {
    this.subscription = this.contactId$.subscribe({
      next: (contactId) => (this.contactId = contactId),
      error: (error) => {
        console.error(
          'Something went wrong while fetching contact details',
          error
        );
      },
    });
  }
}
