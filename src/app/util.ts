import { Content } from './models/jcms/content';

export class Util {
  /**
   *
   * @param content
   * @returns L'url interne à l'application pour rendre le contenu
   */
  public static buildUrlCotent(content: Content): string {
    if (content.class === 'generated.ArticleASE') {
      return '/article/' + content.id;
    }

    if (content.class === 'generated.SousthemeASE') {
      return '/subTheme/' + content.id;
    }

    // TODO structures Lot 2
    if (content.class === 'generated.Contact') {
      return '/contact/details/' + content.id;
    }

    if (content.class === 'com.jalios.jcms.FileDocument') {
      let fileDoc = content as any;
      return fileDoc.absDownloadUrl;
    }

    return '';
  }
}
