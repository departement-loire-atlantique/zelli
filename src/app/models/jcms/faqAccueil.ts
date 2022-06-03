import { Content } from "./content";
import { Category } from "./category";

/**
 * Représente le type JCMS "FAQ Accueil"
 */
export interface FaqAccueil extends Content {
    
  description: string,
  categories: Category[]
}
