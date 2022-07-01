import { AfterViewInit, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { JcmsPager } from '@/app/core/jcmsPager';
import { Content } from '@/app/models/jcms/content';
import { DesignSystemService } from '@/app/services/design-system.service';
import { JcmsClientService } from '@/app/services/jcms-client.service';
import { SharedService } from '@/app/services/shared-service.service';
import { Util } from '@/app/util';

import { Item } from '../../components/list/list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.less'],
})
export class ResearchComponent implements AfterViewInit, OnInit, OnDestroy {
  text: string = '';

  researchRun: boolean = false;

  result: Item[] | undefined;

  pager: JcmsPager<Content> | undefined;

  constructor(
    private _jcms: JcmsClientService,
    private _ds: DesignSystemService,
    private sharedService: SharedService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.result = this.sharedService.variable[0] ? this.sharedService.variable[0] : null;
    this.pager = this.sharedService.variable[1] ? this.sharedService.variable[1] : null;
  }

  ngOnDestroy(): void {
    this.sharedService.variable[0] = this.result;
    this.sharedService.variable[1] = this.pager;
  }

  ngAfterViewInit(): void {
    this._ds.initForm();
  }

  public resetSearch() {
    this.result = undefined;
    this.sharedService.variable = [];
    this._router.navigate(['/themes/']);
  }

  public research(): void {
    this.result = undefined;
    this.pager = undefined;
    if (!this.text) {
      return;
    }

    this.researchRun = true;

    this.processResult(
      this._jcms.getPager<Content>('search', {
        params: {
          text: this.text,
          types: ['SousthemeASE', 'ArticleASE', 'Contact', 'FileDocument'],
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

        if (itContent.class === 'com.jalios.jcms.FileDocument') {
          const fileDoc = itContent as any;

          const type: string = (fileDoc.contentType as string).split('/')[1];

          title += ' (' + type + ' - ' + fileDoc.size / 1000 + ' Ko)';
        }

        this.result.push({
          lbl: title,
          url: Util.buildUrlCotent(itContent),
        });
      }
      this.researchRun = false;

      // TODO Focus for accessibility
    });
  }

  public lblNbResult(): string {
    if (this.result) {
      if (this.result.length <= 0) {
        return 'Oups, il n’y a pas de résultat. Merci de préciser ou reformuler ta recherche';
      }
      if (this.result.length == 1) {
        return 'Il y a 1 résultat';
      }
      return (
        'Il y a ' +
        (this.pager ? this.pager.total : this.result.length) +
        ' résultats'
      );
    }
    return '';
  }

  public moreResult() {
    if (this.pager) {
      this.processResult(this.pager.next());
    }
  }
}

