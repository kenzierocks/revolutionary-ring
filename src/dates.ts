import dateFormat from "dateformat";
import {
    distanceInWords,
    distanceInWordsStrict,
    getSeconds,
    isAfter,
    isBefore,
    isSameMonth,
    isSameSecond
} from "date-fns";

export function prettyDate(date: Date): string {
    const now = Date.now();
    if (isSameMonth(now, date)) {
        const secondsDiff = getSeconds(now) - getSeconds(date);
        if (0 <= secondsDiff && secondsDiff <= 5) {
            return 'right now';
        } else if (-5 <= secondsDiff && secondsDiff < 0) {
            return 'very soon';
        }
        // close enough to use relative dating
        const dist = distanceInWords(now, date, {includeSeconds: true});
        if (isAfter(date, now)) {
            return 'in ' + dist;
        }
        return dist + ' ago';
    }
    // e.g. 25 June 2018, 1:00 PM
    return 'at ' + dateFormat(date, "dd mmmm yyyy, h:MM TT");
}

export function prettyInterval(interval: number): string {
    const now = Date.now();
    const later = now + interval;
    return distanceInWordsStrict(now, later);
}
