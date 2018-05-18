import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {ISTATE} from "./reduxish/store";
import {RingCard} from "./components/RingCard";
import {tags} from "./data/ringInfo";

import "./fbsetup";
import {Container} from "reactstrap";
import {injectModal, SimpleModal} from "./SimpleModal";


$(() => {
    ReactDOM.render(
        <Provider store={ISTATE}>
            <div className="d-flex justify-content-center">
                <div className="d-inline-block mx-auto">
                    <RingCard ringInfo={{
                        id: 'test',
                        name: 'Ring Test',
                        tags: tags(['test', 'foo']),
                        lastCompleteTime: new Date(Date.now()),
                        interval: 10 * 1000
                    }}/>
                </div>
            </div>
        </Provider>, document.getElementById('mount'));
});

$("#btn-create-ring").on('click', e => {
    e.preventDefault();
    injectModal(<SimpleModal title="New Ring" submitLabel="Create" onSubmit={() => {}}>
        <div>
            New Ring Form.
        </div>
    </SimpleModal>)
});
