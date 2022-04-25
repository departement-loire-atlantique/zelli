import { ContactFromApi } from '@/app/models/jcms/contact';

import { Content } from './content';
import { FaqEntry } from './faqEntry';

/**
 *
 */
export interface ArticleASE extends Content {
  picto: string | undefined;

  /**
   * De type Carousel
   */
  diaporama: Content[] | undefined;

  /**
   * Diaporama version texte
   */
  diaporamaTexte: string[] | undefined;

  /**
   * De type Video
   */
  video: Content[] | undefined;

  /**
   * Video version texte
   */
  videoTexte: string[] | undefined;

  titreDescription: string[] | undefined;

  description: string[] | undefined;

  /**
   * De type FaqEntry
   */
  motsCompliques: FaqEntry[] | undefined; // TODO FaqEntry

  liensInternes: Content[] | undefined;

  liensExternes: string[] | undefined;

  libelleLien: string[] | undefined;

  fichesStructures: Pick<ContactFromApi, 'id' | 'title'>[];

  /**
   * html
   */
  saisieLibre: string | undefined;

  affichagePageAAidee: boolean;

  /**
   * ArticleASE
   */
  contenuPrecedent: Content | undefined;

  /**
   * ArticleASE
   */
  contenuSuivant: Content | undefined;

  /**
   * id category
   */
  navigation: string | undefined;
}

export class LiensUtils {
  private _liensInternes: Content[];

  private _liensExternes: string[];

  private _libelleLien: string[];

  liens: { lbl: string; url: string }[];

  constructor(
    liensInternes: Content[] | undefined,
    liensExternes: string[] | undefined,
    libelleLien: string[] | undefined
  ) {
    this._liensInternes = liensInternes ? liensInternes : [];
    this._liensExternes = liensExternes ? liensExternes : [];
    this._libelleLien = libelleLien ? libelleLien : [];

    const maxLength = Math.max(
      this._liensInternes.length,
      this._liensExternes.length,
      this._libelleLien.length
    );

    this.liens = [];
    for (let i = 0; i < maxLength; i++) {
      let lbl = '';
      let url = '';

      if (this._libelleLien.length > i) {
        lbl = this._libelleLien[i];
      }

      if (this._liensExternes.length > i) {
        url = this._liensExternes[i];
        if (!lbl) {
          lbl = url;
        }
      }

      if (this._liensInternes.length > i && this._liensInternes[i]) {
        url = '/article/' + this._liensInternes[i].id;
        if (!lbl) {
          lbl = this._liensInternes[i].title;
        }
      }

      this.liens[i] = { lbl: lbl, url: url };
    }
  }
}
