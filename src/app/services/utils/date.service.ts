import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  public monthDiff(d1: Date, d2: Date) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  public dayDiff(d1: Date, d2: Date) {
    var timeDiff = d2.getTime() - d1.getTime();
    return Math.abs(timeDiff / (1000 * 3600 * 24));
  }

  public testDate(date: Date): boolean {
    return !isNaN(date.getDate());
  }
}
