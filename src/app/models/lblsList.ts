export const lbls: { [key: string]: lbl } = {
  lblBaseline: {
    lbl: "Ton guide vers la majorité et l'autonomie",
    propJcms: 'jcmsplugin.zelli.lbl.baseline',
  },
  lblTrieur: {
    lbl: 'Les documents à garder dans ton trieur',
    propJcms: 'jcmsplugin.zelli.lbl.btn.contenu.trieur',
  },
  lblMotsComp: {
    lbl: 'Les mots compliqués',
    propJcms: 'jcmsplugin.zelli.lbl.mots.compliques',
  },
  lblLiensUtiles: {
    lbl: 'Les liens utiles',
    propJcms: 'jcmsplugin.zelli.lbl.liens.utiles',
  },

  // Welcome Page
  lblTitleWelcome: {
    lbl: 'Bienvenue !',
    propJcms: 'jcmsplugin.zelli.lbl.welcome.title',
  },
  lblDescWelcome: {
    lbl: 'Zelli, c’est ton guide vers la majorité et l’autonomie. Il répond à toutes les questions que tu te poses, et t’aide dans tes démarches.',
    propJcms: 'jcmsplugin.zelli.lbl.welcome.desc',
  },
  lblWelcomeFooter: {
    lbl: 'En t’inscrivant, tu acceptes les ',
    propJcms: 'jcmsplugin.zelli.lbl.welcome.footer',
  },

  // Account Creation
  accountCreateTitle: {
    lbl: 'Créer mon compte',
    propJcms: 'jcmsplugin.zelli.lbl.account.create.title',
  },
  accountCreateStep1: {
    lbl: 'Saisis ton prénom ou un pseudo',
    propJcms: 'jcmsplugin.zelli.lbl.account.create.step1',
  },
  accountCreateStep2: {
    lbl: 'Quel âge as-tu ?',
    propJcms: 'jcmsplugin.zelli.lbl.account.create.step2',
  },
  accountCreateStep3: {
    lbl: 'Choisis ton mot de passe',
    propJcms: 'jcmsplugin.zelli.lbl.account.create.step3',
  },
};

export interface lbl {
  lbl: string;
  propJcms: string;
}
