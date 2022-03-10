export interface Category {
  /**
   * Nom de la catégorie
   */
  title: string,

  /**
  * Nom cour de la catégorie
  */
  smallTitle: string,

  /**
   * Sous titre afficher dans les pages homes
   */
  subTitle: string,

  /**
   * Icon de la catégorie.
   * Doit être une icon-font
   */
  icon: string,

  /**
   * Url interne à l'app 
   */
  url: string
}
