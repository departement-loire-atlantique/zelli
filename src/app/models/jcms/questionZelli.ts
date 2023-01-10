import { Content } from './content';

export interface QuestionZelli extends Content {
  question: string;
  referent: boolean;
  reponse: string;
}
