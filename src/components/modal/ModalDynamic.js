import React, { Component, useState, useEffect } from "react";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";
import "./modalCss.css";

const ModalDynamic=(props)=>{

    return(
        <>
            <Modal
                show={props.showModal}
                //onHide={props.handleModalClose}
                backdrop="static"
                keyboard={false}
                fade={false}
                style={{ opacity: 1,zIndex:9999 }}
                centered
                dialogClassName='custom-dialog'
                >
                    <Modal.Body>
                        {props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
             </Modal>
        </>
    )
}
export default ModalDynamic;