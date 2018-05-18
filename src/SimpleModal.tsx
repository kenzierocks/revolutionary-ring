import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import React from "react";
import ReactDOM from "react-dom";

export function injectModal(modal: React.ReactElement<any>) {
    ReactDOM.render(modal, document.getElementById('mountModal'));
}

export function closeModal() {
    ReactDOM.render([], document.getElementById('mountModal'))
}

export type SimpleModalProps = {
    title: string,
    submitLabel: string,
    onSubmit: React.MouseEventHandler<HTMLElement>
};

export const SimpleModal: React.StatelessComponent<SimpleModalProps> = function SimpleModal(props) {
    return <Modal isOpen={true} toggle={closeModal} backdrop='static' size="huge">
        <ModalHeader toggle={closeModal}>
            {props.title}
        </ModalHeader>
        <ModalBody className="p-3">
            {props.children}
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={closeModal}>Cancel</Button>
            <Button color="primary" onClick={e => {
                closeModal();
                props.onSubmit(e);
            }}>{props.submitLabel}</Button>
        </ModalFooter>
    </Modal>;
};
