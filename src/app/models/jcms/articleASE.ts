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

export class LiensUtils {}
