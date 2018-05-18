export interface TagInfo {
    [tag: string]: true
}

type SpecificTagInfo<T extends string> = Record<T, true>;

export function tags<T extends string>(tags: T[]): SpecificTagInfo<T> {
    const obj: any = {};
    tags.forEach(t => obj[t] = true);
    return obj;
}

export interface RingInfo {
    id: string,
    name: string,
    tags: TagInfo,
    lastCompleteTime: Date,
    interval: number
}

export function riExpectedCompletionTime(ringInfo: RingInfo): Date {
    return new Date(ringInfo.lastCompleteTime.getTime() + ringInfo.interval);
}


export function riPercentComplete(ringInfo: RingInfo, dateNow?: Date): number {
    const now = typeof dateNow === "undefined" ? Date.now() : dateNow.getTime();
    const maxRange = ringInfo.interval;
    const nowRange = now - ringInfo.lastCompleteTime.getTime();
    return 100 * (nowRange / maxRange);
}
