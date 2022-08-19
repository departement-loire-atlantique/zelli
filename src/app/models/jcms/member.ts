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

export function mapApiToMember(mbrApi: any): Member {
  return {
    id: mbrApi.id,
    title: mbrApi.login,
    class: mbrApi.class,
    login: mbrApi.login,
    dateNaissance:
      mbrApi.extraDataMap['extra.Member.jcmsplugin.zelli.datenaissance'],
    email: mbrApi.email,
    photo: mbrApi.photo,
    phone: mbrApi.phone,
    address: mbrApi.address,
  };
}
