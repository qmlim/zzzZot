/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from './sleep-data';

export class StanfordSleepinessData extends SleepData {
	public static ScaleValues = [undefined,//Sleepiness scale starts at 1
	'Feeling active, vital, alert, or wide awake', //1
	'Functioning at high levels, but not at peak; able to concentrate', //2
	'Awake, but relaxed; responsive but not fully alert', //3
	'Somewhat foggy, let down', //4
	'Foggy; losing interest in remaining awake; slowed down', //5
	'Sleepy, woozy, fighting sleep; prefer to lie down', //6
	'No longer fighting sleep, sleep onset soon; having dream-like thoughts']; //7

	private loggedValue:number;
	loggedBegin: Date;
	loggedEnd: Date;

	constructor(loggedValue:number, loggedBegin:Date = new Date(), loggedEnd:Date = new Date()) {
		super();
		this.loggedValue = loggedValue;
		this.loggedBegin = loggedBegin;
		this.loggedEnd = loggedEnd;
	}

	override dateString():string {
		return this.loggedBegin.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	override summaryString():string {
		return this.loggedValue + ": " + StanfordSleepinessData.ScaleValues[this.loggedValue];
	}

	getBegin(): Date {
		return this.loggedBegin;
	}

	getEnd(): Date {
		return this.loggedEnd;
	}

	getLoggedBegin():string {
		var month = this.loggedBegin.toLocaleString('en-US', { month: 'long' });
		var day = this.loggedBegin.getDate();
		var year = this.loggedBegin.getFullYear();

		var hours = this.loggedBegin.getHours();
		var minutes = this.loggedBegin.getMinutes();
		var seconds = this.loggedBegin.getSeconds();
		return month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
	}

	getLoggedEnd():string {
		var month = this.loggedEnd.toLocaleString('en-US', { month: 'long' });
		var day = this.loggedEnd.getDate();
		var year = this.loggedEnd.getFullYear();

		var hours = this.loggedEnd.getHours();
		var minutes = this.loggedEnd.getMinutes();
		var seconds = this.loggedEnd.getSeconds();
		return month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
	}

	valueCreation(): string {
		return this.summaryString() + ' | ' + this.getLoggedBegin() + ' to ' + this.getLoggedEnd();
	}

	keyCreation():string {
		return  this.loggedValue + ' | ' + this.loggedBegin.getFullYear() + '-' + this.loggedBegin.getMonth() + '-' + this.loggedBegin.getDate() + ' ' + this.loggedBegin.getHours() + ':' + this.loggedBegin.getMinutes();
	}
}
