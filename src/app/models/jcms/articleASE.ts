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

  fichesStructures: {} | undefined; // TODO Contact

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

  liens: any;

  constructor(
    liensInternes: Content[] | undefined,
    liensExternes: string[] | undefined,
    libelleLien: string[] | undefined
  ) {
    this._liensInternes = liensInternes ? liensInternes : [];
    this._liensExternes = liensExternes ? liensExternes : [];
    this._libelleLien = libelleLien ? libelleLien : [];

    const max = Math.max(
      this._liensInternes.length,
      this._liensExternes.length,
      this._libelleLien.length
    );

    console.log(max);
    // TODO
  }
}
