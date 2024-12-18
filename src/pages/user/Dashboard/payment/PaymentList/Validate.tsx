import { useEffect, useMemo, useState } from "react"
import BaseStateClass from "../../../components/helper/BaseStateClass"
import PaymentService, { PaymentType } from "../../services/PaymentService"
import { Button, Modal } from "react-bootstrap"

type PropType = {
    show: boolean
    payment_data: PaymentType
    onListener: { (props: any): void }
}

type StateType = {
    payment_data: PaymentType
}

export class ValidateClass extends BaseStateClass<StateType, PropType> {


    async getPaymentData() {
        try {
            let form_data = this.state.payment_data
            let resData = await PaymentService.getById(form_data.id || "")
            return resData
        } catch (error) {
            console.error("getPaymentData - err ", error)
        }
    }

    setPaymentData(props: any) {
        if (props == null) return
        let _return = props.return
        this.setState({
            payment_data: _return
        })
    }

    async validatePayment() {
        let form_data = this.state.payment_data
        try {
            let resData = await PaymentService.validate(form_data.id || "")
            alert("Payment data is validated")
        } catch (error) {
            console.error("validatePayment - err ", error)
        } finally {
            this.props.onListener({
                action: "SUBMIT",
                return: null
            })
        }

    }

    handleClose(submit?: boolean) {
        if (submit == true) {
            this.validatePayment()
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
            <Modal.Body>Do you want validate this payment?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose.bind(this, false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleClose.bind(this, true)}>
                    Validate
                </Button>
            </Modal.Footer>
        </Modal>
    }
}

export default function Validate(props: PropType) {
    let methods = useMemo(() => new ValidateClass(), []);

    methods.defineState(useState<StateType>({
        payment_data: {}
    }), props);

    useEffect(() => {
        if (props.show == false) return
        methods.setState({
            payment_data: props.payment_data
        })
    }, [])

    return methods.render()
}