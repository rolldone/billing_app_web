import { useEffect, useMemo, useState } from "react";
import { ProjectNewClass, PropType, StateType } from "./ProjectNew";
import { useParams } from "react-router-dom";
import ProjectService from "../services/ProjectService";

export class ProjectUpdateClass extends ProjectNewClass {
    async mounted() {
        this.setProject(await this.getProject())
    }
    async getProject() {
        try {
            let form_data = this.state.form_data
            let resData = await ProjectService.getById(form_data.id || "")
            return resData
        } catch (error) {
            console.error("getProject - err ", error)
        }
    }

    setProject(props: any) {
        if (props == null) return
        let _return = props.return;
        this.setState({
            form_data: _return
        })
    }

    async save(): Promise<void> {
        try {
            let form_data = this.state.form_data
            let resData = await ProjectService.update(form_data);
            alert("Update data success")
        } catch (error) {
            console.error("save - err :: ", error)
        }
    }
}

export default function ProjectUpdate(props: PropType) {
    let params = useParams();
    let methods = useMemo(() => new ProjectUpdateClass(), []);

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