import { useEffect, useMemo, useState } from "react"
import BaseStateClass from "../../../components/helper/BaseStateClass"
import PaymentService, { PaymentType } from "../../services/PaymentService"
import { Button, Modal } from "react-bootstrap"

type PropType = {
    show: boolean
    ids: Array<string>
    onListener: { (props: any): void }
}

type StateType = {
}

export class DeleteClass extends BaseStateClass<StateType, PropType> {


    async deletePayment() {
        let ids = this.props.ids
        try {
            let resData = await PaymentService.delete(ids)
            alert("Payment data is deleted")
        } catch (error) {
            console.error("deletePayment - err ", error)
        } finally {
            this.props.onListener({
                action: "SUBMIT",
                return: null
            })
        }

    }

    handleClose(submit?: boolean) {
        if (submit == true) {
            this.deletePayment()
            return
        }
        this.props.onListener({
            action: "CLOSE",
            return: null
        })
    }

    render() {
        return <Modal show={this.props.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want delete this payment?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose.bind(this, false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleClose.bind(this, true)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    }
}

export default function Delete(props: PropType) {
    let methods = useMemo(() => new DeleteClass(), []);

    methods.defineState(useState<StateType>({}), props);

    useEffect(() => {
        if (props.show == false) return
    }, [])

    return methods.render()
}