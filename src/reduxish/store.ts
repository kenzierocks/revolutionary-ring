import {createStore, Reducer} from "redux";
import {afsFactory, validateActionMap} from "./slice";
import {RingInfo} from "../data/ringInfo";
import {DocumentData, FirebaseFirestore} from "@firebase/firestore-types";


type RingInfoMap = Record<string, RingInfo>;

export interface InternalState {
    rings: RingInfoMap
}

const defaultState: InternalState = {
    rings: {}
};

const slicer = afsFactory<InternalState>();

export const Actions = validateActionMap({
    updateRing: slicer.newAction('rings', 'updateRing', (state, payload: RingInfo) => {
        return {...state, [payload.id]: payload};
    }),
    removeRing: slicer.newAction('rings', 'removeRing', (state, payload: string) => {
        const stateCopy = {...state};
        delete stateCopy[payload];
        return stateCopy;
    })
});

function validateRingInfo(data: DocumentData): RingInfo {
    if (typeof data.id !== "string") {
        throw new Error("Non-string ID in RingInfo");
    }
    if (typeof data.name !== "string") {
        throw new Error("Non-string name in RingInfo");
    }
    if (typeof data.tags !== "object") {
        throw new Error("Non-object name in RingInfo");
    }
    if (!(data.lastCompleteTime instanceof Date)) {
        throw new Error("Non-Date lastCompleteTime in RingInfo");
    }
    if (!(data.expectedCompleteTime instanceof Date)) {
        throw new Error("Non-Date expectedCompleteTime in RingInfo");
    }
    return data as any;
}

export function attachToFirestore(firestore: FirebaseFirestore) {
    firestore.collection('rings').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(chg => {
            switch (chg.type) {
                case 'added':
                case 'modified':
                    ISTATE.dispatch(Actions.updateRing(validateRingInfo(chg.doc.data())));
                    break;
                case 'removed':
                    ISTATE.dispatch(Actions.removeRing(chg.doc.id));
            }
        });
    });
}

const reduxDevtools: (() => any) | undefined = (window as any)['__REDUX_DEVTOOLS_EXTENSION__'];

const mainReducer = slicer.getReducer();

const fullReducer: Reducer<InternalState> = (prevState, action) => {
    const newState = mainReducer(prevState, action);

    // error corrections here

    return newState;
};

let devTools = reduxDevtools && reduxDevtools();
export const ISTATE = createStore(fullReducer, defaultState, devTools);
