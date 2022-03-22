import { Category } from "./category";
import { Content } from "./content";

/**
 * Représente le type JCMS "Sous-thème ASE"
 */
export interface SubThemeASE extends Content {
  chapo: string,
  contenu: {}[], // TODO
  affichagePageAAidee: boolean,
  navigation: Category | undefined
}