import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { formatDate } from '@angular/common';
import { SleepService } from '../services/sleep.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  sleepTimeString: string = '';
  wakeTimeString: string = '';
  alertButtons = ['OK'];
  isAlertOpen = false;
  isToastOpen = false;


  constructor(private sleepService: SleepService) {
    this.sleepTimeString = this.toLocalDateTime();
    this.wakeTimeString = this.toLocalDateTime();
  
   }
  
  toLocalDateTime() {
    const now = new Date();
    return now.getFullYear() + '-' +
           this.zeroPad(now.getMonth() + 1) + '-' +
           this.zeroPad(now.getDate()) + 'T' +
           this.zeroPad(now.getHours()) + ':' +
           this.zeroPad(now.getMinutes());
  }
  
  zeroPad(n: number) {
    return n < 10 ? '0' + n : n.toString();
  }


  checkValidDates(sleepStart: Date, sleepEnd: Date) {
    return (sleepStart < sleepEnd);
  }


  messageBoolean(isOpenA: boolean, isOpenT: boolean) {
    if (!isOpenA) {
      this.isAlertOpen = false;
      this.isToastOpen = isOpenT;
    }

    else {
      this.isAlertOpen = isOpenA;
      this.isToastOpen = false;
    }

  }


  logSleep(isOpen: boolean) {
    const sleepStart = new Date(this.sleepTimeString);
    const sleepEnd = new Date(this.wakeTimeString);

    if (this.checkValidDates(sleepStart, sleepEnd)) {

      this.messageBoolean(false, isOpen);
      const overnightSleepData = new OvernightSleepData(sleepStart, sleepEnd);
      this.sleepService.logOvernightData(overnightSleepData);
    }
    else {
      this.messageBoolean(true, isOpen);
    }
  }
}
