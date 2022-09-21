import { Content } from './content';

export interface Redirection extends Content {
  status: string;
  category: string;
  content: Content;
}
