import { Category } from "./category";
import { Content } from "./content";

/**
 * 
 */
export interface ArticleASE extends Content {

  picto: string | undefined,

  diaporama: {} | undefined, // TODO Carousel

  /**
   * Diaporama version texte
   */
  diaporamaTexte: string | undefined,

  video: {} | undefined, // TODO Video

  /**
   * Video version texte
   */
  videoTexte: string | undefined,

  titreDescription: string | undefined,

  description: string | undefined,

  motsCompliques: {} | undefined, // TODO FaqEntry

  liensInternes: Content[] | undefined,

  liensExternes: string[] | undefined,

  libelleLien: string[] | undefined,

  fichesStructures: {} | undefined, // TODO Contact

  /**
   * html
   */
  saisieLibre: string | undefined,

  affichagePageAAidee: boolean,

  contenuPrecedent: ArticleASE | undefined,

  contenuSuivant: ArticleASE | undefined,

  navigation: Category | undefined
}