import { ContactFromApi } from '@/app/models/jcms/contact';

import { Content } from './content';
import { FaqEntry } from './faqEntry';
import { Lien } from './lien';

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

  liensUtiles: Lien[];

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
