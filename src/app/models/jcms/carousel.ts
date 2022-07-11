import { Content } from './content';

/**
 *
 */
export interface Carousel extends Content {
  titre: string | undefined;

  soustitre: string | undefined;

  /**
   * Elements du carousel de type CarouselElement
   */
  elements1: Content[] | undefined;

  /**
   * Image mosaique avec popin
   */
  imageMosaiqueAvecPopin: boolean;
}

export interface CarouselElement extends Content {
  summary: string | undefined;

  image: string | undefined;

  imageMobile: string | undefined;

  imageCarree: string | undefined;

  imageLegend: string | undefined;

  imageCopyright: string | undefined;

  linkTitle: string | undefined;

  internalLink: Content | undefined;

  externalLink: string | undefined;

  newTab: boolean;

  /**
   * Category
   */
  categorieDeNavigation: Content[] | undefined;

  /**
   * Category
   */
  miseEnAvant: Content[] | undefined;
}
