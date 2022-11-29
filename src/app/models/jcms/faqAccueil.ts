import { Content } from './content';

/**
 * Représente le type JCMS "FAQ Accueil"
 */
export interface FaqAccueil extends Content {
  description: string;
  categories: Content[];
  allReferrerSet: Content[];
}
