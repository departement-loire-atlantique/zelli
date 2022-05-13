import { Content } from './content';

export interface Member extends Content {
  login: string;

  // TODO dateNaissance
  dateNaissance: string;

  email: string;

  photo: string;

  phone: string;

  address: string;
}
