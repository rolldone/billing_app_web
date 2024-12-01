import { useEffect, useMemo, useState } from "react";
import { MemberNewClass, PropType, StateType } from "./MemberNew";
import { useParams } from "react-router-dom";
import MemberService from "../services/MemberService";

export class MemberUpdateClass extends MemberNewClass {
    async mounted() {
        this.setMember(await this.getMember())
    }
    async getMember() {
        try {
            let form_data = this.state.form_data
            let resData = await MemberService.getById(form_data.id || "")
            return resData
        } catch (error) {
            console.error("getMember - err ", error)
        }
    }

    setMember(props: any) {
        if (props == null) return
        let _return = props.return;
        this.setState({
            form_data: _return
        })
    }

    async save(): Promise<void> {
        try {
            let form_data = this.state.form_data
            let resData = await MemberService.update(form_data);
            alert("Update data success")
        } catch (error) {
            console.error("save - err :: ", error)
        }
    }
}

export default function MemberUpdate(props: PropType) {
    let params = useParams();
    let methods = useMemo(() => new MemberUpdateClass(), []);

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