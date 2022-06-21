import { Content } from './content';

export interface Lien extends Content {
  lienInterne: Content;

  lienExterne: string;

  texteAlternatif: string;
}
