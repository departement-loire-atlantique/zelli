export interface ICategory {
  id: string,
  title: string,
  smallTitle?: string,
  subTitle?: string,
  icon?: string,
  image?: string,
  url?: string
}

export class Category implements ICategory {

  /**
   * id JCMS
   */
  id: string;

  /**
   * Nom de la catégorie
   */
  title: string;

  /**
  * Nom cour de la catégorie
  */
  smallTitle: string;

  /**
   * Sous titre afficher dans les pages homes
   */
  subTitle: string;

  /**
   * Icon de la catégorie.
   */
  icon: string;

  image: string;

  /**
   * Url interne à l'app 
   */
  url: string;

  constructor(params: ICategory) {
    this.id = params.id;
    this.title = params.title;
    this.smallTitle = params.smallTitle ||"";
    this.subTitle = params.smallTitle ||"";
    this.subTitle = params.subTitle ||"";
    this.icon = params.icon ||"";
    this.image = params.image ||"";
    this.url = params.url || "";
  }

}
