import { useEffect, useMemo, useState } from "react";
import { BillNewClass, PropType, StateType } from "./BillNew";
import { useParams } from "react-router-dom";
import BillService from "../services/BillService";

export class BillUpdateClass extends BillNewClass {
    async mounted() {
        this.setBill(await this.getBill())
    }

    async getBill() {
        try {
            let resData = await BillService.getById(this.state.form_data.id || "")
            return resData
        } catch (error) {
            console.log("getBill - err", error)
        }
    }

    setBill(props: any) {
        if (props == null) return
        this.setState({
            form_data : props.return
        })
    }

    async save(): Promise<void> {
        try {
            let form_data = this.state.form_data
            let resData = await BillService.update(form_data)
            debugger;
        } catch (error) {
            console.error("save - err ",error)
        }
    }
}

export default function BillUpdate(props: PropType) {
    let params = useParams()
    let methods = useMemo(() => new BillUpdateClass(), []);

    methods.defineState(useState<StateType>({
        form_data: {
            id: params.id
        },
        form_error: {},
        member_datas: [],
        project_datas: [],
        show_select_member_modal: false,
        show_select_project_modal: false
    }), props);

    useEffect(() => {
        methods.mounted()
    }, [])


    return methods.render()
}