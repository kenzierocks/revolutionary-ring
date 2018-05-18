import React from "react";
import {Button} from "reactstrap";
import {riExpectedCompletionTime, RingInfo, riPercentComplete} from "../data/ringInfo";
import {Ring} from "./Ring";
import {prettyDate, prettyInterval} from "../dates";
import {FAIcon} from "../FontAwesome";

export type RingCardProps = {
    ringInfo: RingInfo
};
type RingCardState = {
    intervalId?: number,
    percentage: number
};

export class RingCard extends React.Component<RingCardProps, RingCardState> {
    constructor(props: RingCardProps) {
        super(props);
        this.state = {
            percentage: this.computePercentage()
        };
    }

    componentDidMount() {
        this.setState(state => {
            const lastIntId = state.intervalId;
            if (typeof lastIntId !== "undefined") {
                clearInterval(lastIntId);
            }
            return {
                ...state,
                intervalId: setInterval(() => this.updateRing(), 50)
            }
        });
    }

    componentWillUnmount() {
        this.setState(state => {
            const lastIntId = state.intervalId;
            if (typeof lastIntId !== "undefined") {
                clearInterval(lastIntId);
            }
            return {
                ...state,
                intervalId: undefined
            }
        });
    }

    private computePercentage() {
        return riPercentComplete(this.props.ringInfo);
    }

    private updateRing() {
        this.setState(state => {
            return {...state, percentage: this.computePercentage()};
        });
    }

    private resetRing() {

    }

    render() {
        const ri = this.props.ringInfo;
        const p = this.state.percentage;
        // layout:
        // [Ring] [Title/Desc] [Buttons]
        // T/D layout (vertical):
        // [Title] [Text] [Text] ...
        return <div className="d-flex justify-content-start align-items-center border border-primary rounded p-3"
                    style={{width: '40vw', height: '25vh'}}>
            <div className="mr-3" style={{width: '5vw'}}>
                <Ring percent={p}/>
            </div>

            <div className="d-flex flex-column justify-content-start align-items-start mr-auto">
                <h5 className="mt-0 font-weight-bold">{ri.name}</h5>

                <span>
                    <FAIcon icon="check-circle" type="regular" className="text-success"/>{" "}
                    <strong>
                        Last completion
                    </strong>
                    {" " + prettyDate(ri.lastCompleteTime)}.
                </span>
                <span>
                    {expectedProgressIcon(p)}
                    {" "}
                    <strong>
                        Estimated next completion
                    </strong>
                    {" " + prettyDate(riExpectedCompletionTime(ri))}.
                </span>
                <span>
                    <FAIcon icon="clock" type="regular"/>
                    {" "}
                    <strong>
                        Interval
                    </strong>
                    : every {prettyInterval(ri.interval)}
                </span>
            </div>

            <div>
                <Button onClick={() => this.resetRing()}>Complete</Button>
            </div>
        </div>;
    }
}

function expectedProgressIcon(progress: number): React.ReactNode {
    if (progress <= 80) {
        return <FAIcon title="Plenty of time!" icon="check-circle" type="regular" className="text-success"/>;
    }
    if (progress <= 100) {
        return <FAIcon title="Almost passed!" icon="clock" type="regular" className="text-warning"/>;
    }
    return <FAIcon title="Passed! Oh no!" icon="times-circle" type="regular" className="text-danger"/>;
}