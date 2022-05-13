import { Content } from './content';

export interface Member extends Content {
  login: string;

  // TODO dateNaissance

  photo: string;

  phone: string;

  address: string;
}
