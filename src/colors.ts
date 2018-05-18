import {oKeys} from "./utils";

export type SimpleColor = [number, number, number];

function hexStringSC(color: SimpleColor): string {
    return '#' + color
        .map(c => {
            const s = c.toString(16);
            return s.length < 2 ? '0' + s : s;
        })
        .join('');
}

export type InputColors = {
    0: SimpleColor
    1: SimpleColor
} & Array<SimpleColor>;

type RangeMap = {
    0: SimpleColor
    1: SimpleColor
    [n: number]: SimpleColor | undefined
};

export class GradientCalculator {

    static create(colors: InputColors): GradientCalculator {
        const ranges = {
            0: colors[0],
            1: colors[colors.length - 1]
        } as RangeMap;
        const incr = 1 / (colors.length - 1);
        for (let i = 1, r = incr; i < colors.length - 1; i++, r += incr) {
            ranges[r] = colors[i];
        }
        return new GradientCalculator(ranges);
    }

    ranges: RangeMap;

    constructor(ranges: RangeMap) {
        this.ranges = ranges;
    }

    private _rFilt(filter: (n: 0 | 1 | number) => boolean, reverse: boolean = false): [number, SimpleColor] | undefined {
        let keys = oKeys(this.ranges).sort((a, b) => a > b ? 1 : (a < b ? -1 : 0));
        if (reverse) {
            keys = keys.reverse();
        }
        return keys
            .filter(filter)
            .map(k => {
                const v = this.ranges[k];
                const r: [number, SimpleColor] | undefined = typeof v === "undefined" ? undefined : [k, v];
                return r;
            })[0];
    }

    getColorAt(percent: number): SimpleColor {
        const low = this._rFilt(n => (n <= percent), true);
        const hi = this._rFilt(n => (n >= percent));
        if (typeof low === "undefined") {
            return this.ranges[0];
        }
        if (typeof hi === "undefined") {
            return this.ranges[1];
        }
        const [lowP, lowC] = low;
        const [hiP, hiC] = hi;
        const range = (percent - lowP) / (hiP - lowP);
        return slideColor(lowC, hiC, range);
    }

    getHexColorAt(percent: number): string {
        return hexStringSC(this.getColorAt(percent));
    }
}

export function slideColor(startColor: SimpleColor, endColor: SimpleColor, percent: number): SimpleColor {
    const resultColor: SimpleColor = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        const s = startColor[i];
        const e = endColor[i];
        // logic:
        // s * 1 + e * 0 == s, so 0% == start
        // s * 0 + e * 1 == e, so 100% == end
        resultColor[i] = Math.ceil(s * (1 - percent) + e * percent);
    }
    return resultColor;
}
