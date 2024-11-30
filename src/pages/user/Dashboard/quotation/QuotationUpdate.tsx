import { useEffect, useMemo, useState } from "react";
import { PropType, QuotationNewClass, StateType } from "./QuotationNew";
import { useParams } from "react-router-dom";
import QuotationService from "../services/QuotationService";

export class QuotationUpdateClass extends QuotationNewClass {

    async mounted(): Promise<void> {
        await super.mounted()
        this.setQuotation(await this.getQuotationById());
    }

    async save() {
        try {
            let form_data = this.state.form_data
            let resData = await QuotationService.update(form_data)
            debugger
        } catch (error) {
            console.error("save - err :: ", error)
        }
    }

    async getQuotationById() {
        try {
            let form_data = this.state.form_data
            let resData = await QuotationService.getById(form_data.id || "")
            return resData
        } catch (error) {

        }
    }

    setQuotation(props: any) {
        if (props == null) return
        let _return = props.return
        this.setState({
            form_data: _return
        })
    }
}

export default function QuotationUpdate(props: PropType) {
    let parms = useParams()
    let methods = useMemo(() => new QuotationUpdateClass(), [])

    methods.defineState(useState<StateType>({
        form_data: {
            id: parms["id"]
        },
        form_error: {},
        project_datas: []
    }), props);

    useEffect(() => {
        methods.mounted()
    }, [])

    return methods.render()
}