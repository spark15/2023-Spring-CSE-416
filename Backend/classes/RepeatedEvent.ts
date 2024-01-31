/**
 * Represent an event with time and place
 * @contstructor
 * @param {string} day - The day of the event e.g. "Monday"
 * @param {string} startTime - The start time in the format of "00:00 AM"
 * @param {string} endTime -  The end time in the format of "00:00 PM"
 * @param {string} place - The place of the event happneing.
 */
export class RepeatedEvent{
    day: string;
    startTime: string;
    endTime: string;
    place: string;
  
    constructor(day: string, startTime: string, endTime: string, place: string){
      this.day = day;
      this.startTime = startTime;
      this.endTime = endTime;
      this.place = place;
    }
  
    /**
     * This function returns how many seconds does the event happen.
     * @returns {number} how many seconds does the event happen.
     */
    returnDuration(): number {
      return stringToTime(this.endTime) - stringToTime(this.startTime);
    }
  }

  function stringToTime(time: string): number {
    if (/^([0-1][0-2]):[0-5][0-9]\s*[AP]*[M]/.test(time) == false) {
      return -1;
    }
    let hour: number = 10 * letterToDigit(time[0]) + letterToDigit(time[1]);
    let minutes: number = 10 * letterToDigit(time[2]) + letterToDigit(time[3]);
    let am: number;
  
    if (time[5] == "A") {
      am = 0;
    } else {
      am = 1;
    }
  
    let result: number = (am * 12 * 60 + hour * 60  + minutes) * 60;
  
    return result;
  }

  /**
 * A function to translate a digit from String to number
 * @param {string} char a single digit to be translated
 * @returns {number} a number translated
 */
function letterToDigit(char: string): number {
    let letters = ["0","1","2","3","4","5","6","7","8","9"];
    let result: number = -1;
    if (char.length > 1) {
      return result;
    }
    for (let i = 0; i<letters.length; i++) {
      if (char[0] == letters[i]) {
        result = i;
        break;
      }
    }
    return result;
  }