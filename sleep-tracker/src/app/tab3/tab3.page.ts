import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SleepService } from '../services/sleep.service'; // Update the path to match your service location
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy{
  overnightData: OvernightSleepData[] = [];
  sleepinessData: StanfordSleepinessData[] = [];
  currentTime: Date | undefined;
  dataAddedSubscription: Subscription | undefined;


  constructor(private sleepService: SleepService) {
  }
  
   ngOnInit() {
    this.init();
    this.updateCurrentTime();
    setInterval(() => { this.updateCurrentTime(); }, 1000);

    // Subscribe to the event emitted by SleepService when new data is added
    this.dataAddedSubscription = this.sleepService.dataAdded.subscribe(() => {
      this.updateData();
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.dataAddedSubscription) {
      this.dataAddedSubscription.unsubscribe();
    }
  }

  async init() {
    this.overnightData = await this.sleepService.getOvernightSleepData();
    this.sleepinessData = await this.sleepService.getSleepinessData();
  }

  async updateData() {
    this.overnightData = await this.sleepService.getOvernightSleepData();
    this.sleepinessData = await this.sleepService.getSleepinessData();
  }

  updateCurrentTime()
  {
    this.currentTime = new Date();
  }

  getCurrentDate(): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (this.currentTime) {
      const dayOfWeek = days[this.currentTime.getDay()];
      const month = months[this.currentTime.getMonth()];
      const dayOfMonth = this.currentTime.getDate();
      return `${dayOfWeek}, ${month} ${dayOfMonth}`;
    } else {
      return '';
    }
  }

  toggleDataView(view: string) {
    const sleepData = document.getElementById("sleepData");
    const sleepinessData = document.getElementById("sleepinessData");
    const linkSleepData = document.getElementById("linkSleepData");
    const linkSleepinessData = document.getElementById("linkSleepinessData");
    const options = document.getElementById("options");
    const returnHome = document.getElementById("returnHome");
    const images = document.getElementById("images");
  
    if (sleepData && sleepinessData && linkSleepData && linkSleepinessData && options && returnHome && images) {
      switch (view) {
        case 'sleepData':
          sleepData.style.display = "block";
          sleepinessData.style.display = "none";
          options.style.display = "none";
          returnHome.style.display = "block";
          images.style.display = "none";
          break;
  
        case 'sleepinessData':
          sleepData.style.display = "none";
          sleepinessData.style.display = "block";
          options.style.display = "none";
          returnHome.style.display = "block";
          images.style.display = "none";
          break;
  
        case 'returnHome':
          sleepData.style.display = "none";
          sleepinessData.style.display = "none";
          options.style.display = "block";
          returnHome.style.display = "none";
          images.style.display = "block";
          break;
  
        default:
          sleepData.style.display = "none";
          sleepinessData.style.display = "none";
          options.style.display = "block";
          returnHome.style.display = "none";
          images.style.display = "block";
          break;
      }
    }
  }
}
