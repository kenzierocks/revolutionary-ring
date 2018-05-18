declare module 'react-circular-progressbar' {
    import * as React from 'react';
    import {CSSProperties} from "react";

    export interface CircularProgressbarProps {
        percentage: number;
        className?: string;
        classes?: PartMap<string>;
        styles?: PartMap<CSSProperties>;
        strokeWidth?: number;
        background?: boolean;
        backgroundPadding?: number;
        initialAnimation?: boolean;
        counterClockwise?: boolean;
        classForPercentage?: (percentage: number) => string;
        textForPercentage?: (percentage: number) => string;
    }

    export interface PartMap<T> {
        root?: T;
        trail?: T;
        path?: T;
        text?: T;
        background?: T;
    }

    class CircularProgressbar extends React.Component<CircularProgressbarProps, any> {
    }

    export default CircularProgressbar;
}

