import { useEffect, useMemo, useState } from "react"
import ReactSvg from "../../../assets/react.svg"
import { PropType, StateType, Step1Class } from "./Step1"



export class LastClass extends Step1Class {

    render() {
        return <>
            <div className="card-body text-center py-4 p-sm-5">
                <img src={ReactSvg} style={{ width: "100px", height: "auth" }}></img>
                <h1 className="mt-5">Welcome to Bill App!</h1>
                <p className="text-secondary">
                    Tabler comes with tons of well-designed components and features. Start
                    your adventure with Tabler and make your dashboard great again.
                </p>
            </div>
            <div className="hr-text hr-text-center hr-text-spaceless">your data</div>
            <div className="card-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, dolores dignissimos. Laboriosam nobis blanditiis a ad nemo odit ducimus rerum, sequi adipisci veritatis. Ratione impedit pariatur voluptates saepe fugiat. Non.
            </div>
        </>
    }
}

export default function Last(props: PropType) {

    let methods = useMemo(() => new LastClass(), []);

    methods.defineState(useState<StateType>({
        form_data: props.value
    }), props);

    useEffect(() => {
        methods.setState({
            form_data: props.value
        })
    }, [props.value])

    return methods.render()

}