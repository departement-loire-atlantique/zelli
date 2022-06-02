import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from '@/app/components/list/list.component';
import { JcmsPager } from '@/app/core/jcmsPager';
import { APageHome } from '@/app/models/aPageHome';
import { Content } from '@/app/models/jcms/content';
import { ContactDetailsService } from '@/app/services/contact-details.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { Util } from '@/app/util';

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.component.html',
  styleUrls: ['./my-contacts.component.less'],
})
export class MyContactsComponent extends APageHome implements OnInit {
  text: string = '';
  researchRun: boolean = false;
  result: Item[] | undefined;
  pager: JcmsPager<Content> | undefined;

  isLoadingContacts = false;
  errorLoadingContacts = false;

  constructor(
    _injector: Injector,
    private _jcms: JcmsClientService,
    private _contactDetailsService: ContactDetailsService
  ) {
    super(_injector);
  }

  ngOnInit(): void {
    this.isLoadingContacts = true;
    this.getMyContacts();
    this.isLoadingContacts = false;
  }

  public getMyContacts(): void {
    this.result = undefined;
    this.pager = undefined;
    this.researchRun = true;
    this.processResult(
      this._jcms.getPager<Content>('search', {
        params: {
          types: ['Contact'],
          exactType: true,
        },
      })
    );
  }

  public processResult(obs: Observable<JcmsPager<Content>>) {
    obs.subscribe((pager: JcmsPager<Content>) => {
      if (!this.result) {
        this.result = [];
      }
      this.pager = pager;
      const contents = pager.dataInPage;
      for (let itContent of contents) {
        let title: string = itContent.title;
        this.result.push({
          lbl: title,
          url: Util.buildUrlCotent(itContent),
        });
      }
      this.researchRun = false;
      // TODO Focus for accessibility
    });
  }

  public isResult(): boolean {
    if (this.result) {
      if (this.result.length > 0) {
        return true;
      }
    }
    return false;
  }

  public moreResult() {
    if (this.pager) {
      this.processResult(this.pager.next());
    }
  }
}
