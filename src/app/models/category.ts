export interface ICategory {
  title: string,
  smallTitle?: string,
  subTitle?: string,
  icon?: string,
  image?: string,
  url?: string
}

export class Category implements ICategory {
  /**
   * Nom de la catégorie
   */
  title: string;

  /**
  * Nom cour de la catégorie
  */
  private _smallTitle?: string | undefined;

  /**
   * Sous titre afficher dans les pages homes
   */
  private _subTitle?: string | undefined;

  /**
   * Icon de la catégorie.
   */
  private _icon?: string | undefined;

  private _image?: string | undefined;

  /**
   * Url interne à l'app 
   */
  private _url?: string | undefined = "";

  constructor(params: ICategory) {
    this.title = params.title;
    this._smallTitle = params.smallTitle;
    this._subTitle = params.smallTitle;
    this._subTitle = params.subTitle;
    this._icon = params.icon;
    this._image = params.image;
    this._url = params.url;
  }

  public get smallTitle(): string {
    return this._smallTitle || "";
  }

  public get subTitle(): string {
    return this._subTitle || "";
  }

  public get icon(): string {
    return this._icon || "";
  }

  public get image(): string {
    return this._image || "";
  }

  public get url(): string {
    return this._url || "";
  }


}
