import { Injectable, EventEmitter } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Preferences, SetOptions, GetOptions } from '@capacitor/preferences';



@Injectable({
  providedIn: 'root'
})

export class SleepService{
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];
	public dataAdded: EventEmitter<void> = new EventEmitter<void>();

	constructor() {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
		}
		this.clearAllData();
	}

	async clearAllData() {
		// Preferences.clear(); // Only uncomment when you need to clear all data
	} 
	  
	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	async logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		let key:string = sleepData.keyCreation();

		let dataToSet: SetOptions = {
			key: key,
			value: sleepData.valueCreation()
		};

		await Preferences.set(dataToSet);
		this.dataAdded.emit();
	}

	async logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		let key:string = sleepData.keyCreation();

		let dataToSet: SetOptions = {
			key: key,
			value: sleepData.valueCreation()
		};

		await Preferences.set(dataToSet);
		this.dataAdded.emit();
	}

	async getOvernightSleepData() {
		const overnightData = [];
		try {
			const keysResult = await Preferences.keys();
			const allKeys = keysResult.keys;

			for (const sleepData of allKeys) {
				const getData = await Preferences.get({ key : sleepData });
				if (getData.value && !getData.value.includes('|')) {
					const dataParts = getData.value.split(' to ');
					const sleepStart = new Date(dataParts[0]);
					const sleepEnd = new Date(dataParts[1]);
					const overnightSleepData = new OvernightSleepData(sleepStart, sleepEnd);
					overnightData.push(overnightSleepData);
				}
			}
			overnightData.sort((a, b) => a.getStart().getTime() - b.getStart().getTime());
			return overnightData;
		} catch (error) {
			console.error('Error retrieving overnight data:', error);
			return [];
		}
	}

	async getSleepinessData() {
		const sleepyData = [];
		try {
			const keysResult = await Preferences.keys();
			const allKeys = keysResult.keys;

			for (const sleepData of allKeys) {
				const getData = await Preferences.get({ key : sleepData });
				if (getData.value && getData.value.includes('|')) {
					const splitList = getData.value.split(' | ');
					const dataValue = splitList[0].charAt(0);
					const dataTimes = splitList[1].split(' to ');
					const sleepStart = new Date(dataTimes[0]);
					const sleepEnd = new Date(dataTimes[1]);
					const standfordSleepData = new StanfordSleepinessData(Number(dataValue), sleepStart, sleepEnd);
					sleepyData.push(standfordSleepData);
				}
			}
			sleepyData.sort((a, b) => a.getBegin().getTime() - b.getBegin().getTime());
			return sleepyData;
		} catch (error) {
			console.error('Error retrieving sleepiness data:', error);
			return [];
		}
	}
}
