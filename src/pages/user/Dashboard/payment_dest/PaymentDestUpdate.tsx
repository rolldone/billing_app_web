import { useEffect, useMemo, useState } from "react";
import { PaymentDestNewClass, PropType, StateType } from "./PaymentDestNew";
import { useParams } from "react-router-dom";
import PaymentDestService from "../services/PaymentDestService";

export class PaymentDestUpdateClass extends PaymentDestNewClass {
    async mounted() {
        this.setPaymentDest(await this.getPaymentDest())
    }
    async getPaymentDest() {
        try {
            let form_data = this.state.form_data
            let resData = await PaymentDestService.getById(form_data.id || "")
            return resData
        } catch (error) {
            console.error("getPaymentDest - err ", error)
        }
    }

    setPaymentDest(props: any) {
        if (props == null) return
        let _return = props.return;
        this.setState({
            form_data: _return
        })
    }

    async save(): Promise<void> {
        try {
            let form_data = this.state.form_data
            let resData = await PaymentDestService.update(form_data);
            alert("Update data success")
        } catch (error) {
            console.error("save - err :: ", error)
        }
    }
}

export default function PaymentDestUpdate(props: PropType) {
    let params = useParams();
    let methods = useMemo(() => new PaymentDestUpdateClass(), []);

    methods.defineState(useState<StateType>({
        form_data: {},
        form_error: {}
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