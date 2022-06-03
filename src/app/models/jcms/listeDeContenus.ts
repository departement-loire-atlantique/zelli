import { Content } from "./content";
import { FaqAccueil } from "./faqAccueil";

/**
 * Représente le type JCMS "ListeDeContenus"
 */
export interface ListeDeContenus extends Content {

    libelleTitre: string,

    contenus: FaqAccueil[],

    affichagePageAAidee: boolean
}