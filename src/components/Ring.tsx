import React, {CSSProperties} from "react";
import CircularProgressBar from "react-circular-progressbar";
import {GradientCalculator, SimpleColor} from "../colors";

export type RingProps = {
    percent: number,
    className?: string,
    // broken right now
    // style?: CSSProperties
};

// bootstrap theme colors (todo: maybe detect / parse?)
const success: SimpleColor = [0x1f, 0x8c, 0x22];
const warning: SimpleColor = [0xe7, 0x6b, 0x00];
const danger: SimpleColor = [0xff, 0x11, 0x03];
const gradient = GradientCalculator.create([success, warning, danger]);

export const Ring: React.StatelessComponent<RingProps> = function Ring(props) {
    return <CircularProgressBar
        classes={props.className ? {
            root: props.className
        } : undefined}
        styles={{
            // root: props.style,
            path: {
                stroke: gradient.getHexColorAt(props.percent / 100)
            }
        }}
        percentage={props.percent}
        strokeWidth={16}
        textForPercentage={() => ""}
        counterClockwise={true}
    />;
};