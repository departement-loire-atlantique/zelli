import { Content } from './content';
import { FaqAccueil } from './faqAccueil';

/**
 *
 */
export interface FaqEntry extends Content {
  /**
   * Réponse en HTML
   */
  answer: string;
  faq: FaqAccueil;
}
