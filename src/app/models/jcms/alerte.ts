import { Content } from './content';

export class Alerte {
  subject: string;

  dateDay: string;
  dateMonth: string;
  dateYear: string;

  comment: string;

  sendAlert: boolean;

  constructor(
    subject: string,
    dateDay: string,
    dateMonth: string,
    dateYear: string,
    comment: string,
    sendAlert?: boolean
  ) {
    this.subject = subject;

    this.dateDay = dateDay;
    this.dateMonth = dateMonth;
    this.dateYear = dateYear;

    this.comment = comment;

    this.sendAlert = sendAlert ? sendAlert : true;
  }

  public createIcs(): Blob | null {
    if (!this.subject || !this.dateYear || !this.dateMonth || !this.dateDay) {
      return null;
    }

    const dateIcs = this.dateYear + this.dateMonth + this.dateDay;

    let ics =
      'BEGIN:VCALENDAR\n' +
      'VERSION:2.0\n' +
      'PRODID:-//CD44 - Digiwin//Zelli v1.0//FR\n' +
      'BEGIN:VEVENT\n' +
      'DTSTART:' +
      dateIcs +
      '\n' +
      'SUMMARY:' +
      this.subject +
      '\n' +
      'DESCRIPTION:' +
      this.comment.replace(/[\r\n]/g, '\\n') +
      '\n' +
      'TRANSP: TRANSPARENT\n' +
      'END:VEVENT\n' +
      'END:VCALENDAR';

    var blob = new Blob([ics], { type: 'text/Calendar;charset=utf8' });

    return blob;
  }

  public buildForSendApi(): AlerteSend {
    return {
      title: this.subject,
      description: this.comment,
      sendAlert: this.sendAlert,
      edate:
        this.dateDay + '/' + this.dateMonth + '/' + this.dateYear + ' 00:00',
    };
  }
}

export interface AlerteSend {
  title: string;

  description: string;

  sendAlert: boolean;

  /**
   * date millis
   */
  edate: string;
}

export interface AlerteApi extends Content, AlerteSend {}
