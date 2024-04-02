import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	override summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

	override dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	getStart(): Date {
		return this.sleepStart;
	}

	getEnd(): Date {
		return this.sleepEnd;
	}

	getSleepStart():string {
		var month = this.sleepStart.toLocaleString('en-US', { month: 'long' });
		var day = this.sleepStart.getDate();
		var year = this.sleepStart.getFullYear();

		var hours = this.sleepStart.getHours();
		var minutes = this.sleepStart.getMinutes();
		var seconds = this.sleepStart.getSeconds();
		return month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
	}

	getSleepEnd():string {
		var month = this.sleepEnd.toLocaleString('en-US', { month: 'long' });
		var day = this.sleepEnd.getDate();
		var year = this.sleepEnd.getFullYear();

		var hours = this.sleepEnd.getHours();
		var minutes = this.sleepEnd.getMinutes();
		var seconds = this.sleepEnd.getSeconds();
		return month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
	}

	valueCreation(): string {
		return this.getSleepStart() + ' to ' + this.getSleepEnd();
	}

	keyCreation():string {
		return this.sleepStart.getFullYear() + '-' + this.sleepStart.getMonth() + '-' + this.sleepStart.getDate() + ' ' + this.sleepStart.getHours() + ':' + this.sleepStart.getMinutes();
	}
}
