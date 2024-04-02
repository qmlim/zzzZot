import { Component, AfterViewInit } from '@angular/core';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page implements AfterViewInit {
  scale1!: HTMLElement | null;
  scale2!: HTMLElement | null;
  scale3!: HTMLElement | null;
  scale4!: HTMLElement | null;
  scale5!: HTMLElement | null;
  scale6!: HTMLElement | null;
  scale7!: HTMLElement | null;
  scales: (HTMLElement | null)[];

  isAlertOpen = false;
  alertButtons = ['OK'];
  lastEmittedValue: number = 4;
  sleepyStartTime: string = '';
  sleepyEndTime: string = '';
  sleepyScaleObj: StanfordSleepinessData | undefined;

  
  constructor(private sleepService: SleepService) {
    this.sleepyStartTime = this.toLocalDateTime();
    this.sleepyEndTime = this.toLocalDateTime();
    this.scales = [];
  }

  
  ngAfterViewInit() {
    this.scale1 = document.getElementById('scale1');
    this.scale2 = document.getElementById('scale2');
    this.scale3 = document.getElementById('scale3');
    this.scale4 = document.getElementById('scale4');
    this.scale5 = document.getElementById('scale5');
    this.scale6 = document.getElementById('scale6');
    this.scale7 = document.getElementById('scale7');

    this.scales = [this.scale1, this.scale2, this.scale3, this.scale4, this.scale5, this.scale6, this.scale7];
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


  nextSection(num: number) {
    const sleepyStart = document.getElementById("sleepyStart");
    const sleepyEnd = document.getElementById("sleepyEnd");
    const sleepySubmit = document.getElementById("sleepySubmit");
    const barTick = document.getElementById("barTick");
    const scale4 = document.getElementById("scale4");
    const logLevel = document.getElementById("logLevel");
    
    if ((sleepyStart !== null) && 
        (sleepyEnd !== null) && 
        (sleepySubmit !== null) &&
        (barTick !== null) &&
        (scale4 != null) &&
        logLevel !== null) {

        switch(num){
          case 1:
            sleepyStart.style.display = "none";
            sleepyEnd.style.display = "none";
            sleepySubmit.style.display = "none";
            barTick.style.display = "block";
            scale4.style.display = "block";
            logLevel.style.display = "block";
            break;

          case 2:
            sleepyStart.style.display = "flex";
            sleepyEnd.style.display = "flex";
            sleepySubmit.style.display = "flex";
            barTick.style.display = "none";
            logLevel.style.display = "none";
            break;

          default:
            break;
        }
    }
  }


  logSleep(isOpen: boolean) {
    const sleepStart = new Date(this.sleepyStartTime);
    const sleepEnd = new Date(this.sleepyEndTime);

    if (this.checkValidDates(sleepStart, sleepEnd)) {
      this.isAlertOpen = false;
      console.log('Selected Sleepy Start Date and Time:', this.sleepyStartTime);
      console.log('Selected Sleepy End Date and Time:', this.sleepyEndTime);

      this.nextSection(1);
    }
    else {
      this.isAlertOpen = isOpen;
      console.log("ERROR: End Time is earlier than Start Time")
    }
  }


  removeAnyDisplayedDescription() {
    for (const scale of this.scales) {
      if (scale)
        if (scale.style.display != "none")
          scale.style.display = "none";
    }
  }


  onSleepyValueChange(ev: any) {
    console.log("Range value changed to:", ev.target.value);

    this.removeAnyDisplayedDescription();
    
    switch (ev.target.value) {
      case 1:
        if (this.scale1)
          this.scale1.style.display = "block";
        this.lastEmittedValue = 1;
        break;

      case 2:
        if (this.scale2)
          this.scale2.style.display = "block";
        this.lastEmittedValue = 2;
        break;

      case 3:
        if (this.scale3)
          this.scale3.style.display = "block";
        this.lastEmittedValue = 3
        break;

      case 4:
        if (this.scale4)
          this.scale4.style.display = "block";
        this.lastEmittedValue = 4
        break;

      case 5:
        if (this.scale5)
          this.scale5.style.display = "block";
        this.lastEmittedValue = 5
        break;

      case 6:
        if (this.scale6)
          this.scale6.style.display = "block";
        this.lastEmittedValue = 6;
        break;

      case 7:
        if (this.scale7)
          this.scale7.style.display = "block";
        this.lastEmittedValue = 7;
        break;

      default:
        break;
    }
  }


  logLevel() {
    const standfordSleepinessData = new StanfordSleepinessData(this.lastEmittedValue, new Date(this.sleepyStartTime), new Date(this.sleepyEndTime));
    this.sleepService.logSleepinessData(standfordSleepinessData);
    console.log(standfordSleepinessData.summaryString());
  }


  back() {
    this.removeAnyDisplayedDescription();
    this.nextSection(2);
  }
}
