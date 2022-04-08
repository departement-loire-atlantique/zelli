import { Content } from './content';

/**
 *
 */
export interface FaqEntry extends Content {
  /**
   * Réponse en HTML
   */
  answer: string;
}
