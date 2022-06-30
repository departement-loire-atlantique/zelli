import { Content } from "./content";
import { FaqAccueil } from "./faqAccueil";

/**
 * Représente le type JCMS "ListeDeContenus"
 */
export interface ListeDeContenus extends Content {

    libelleTitre: string,

    contenus: Content[],

    affichagePageAAidee: boolean
}
