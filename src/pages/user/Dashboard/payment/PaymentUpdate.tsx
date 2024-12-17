import { useEffect, useMemo, useState } from "react";
import { PaymentNewClass, PropType, StateType } from "./PaymentNew";
import { useParams } from "react-router-dom";
import PaymentService from "../services/PaymentService";

export class PaymentUpdateClass extends PaymentNewClass {
    async mounted() {
        this.setPayment(await this.getPayment())
    }
    async getPayment() {
        try {
            let form_data = this.state.form_data
            let resData = await PaymentService.getById(form_data.id || "")
            return resData
        } catch (error) {
            console.error("getPayment - err ", error)
        }
    }

    setPayment(props: any) {
        if (props == null) return
        let _return = props.return;
        this.setState({
            form_data: _return
        })
        setTimeout(async () => {
            this.calculateRemaining()
            this.setPaymentDests(await this.getPaymentDests())
        }, 1000);
    }

    async save(): Promise<void> {
        try {
            let form_data = this.state.form_data
            let resData = await PaymentService.update(form_data);
            alert("Update data success")
        } catch (error) {
            console.error("save - err :: ", error)
        }
    }
}

export default function PaymentUpdate(props: PropType) {
    let params = useParams();
    let methods = useMemo(() => new PaymentUpdateClass(), []);

    methods.defineState(useState<StateType>({
        form_data: {},
        form_error: {},
        payment_dest_datas: [],
        show_select_bill_modal: false
    }), props)

    useEffect(() => {
        if (params.id == null) return
        methods.setState({
            form_data: {
                id: params.id
            }
        })
        setTimeout(() => {
            methods.mounted()
        }, 1000);
    }, [params.id])

    return methods.render()
}