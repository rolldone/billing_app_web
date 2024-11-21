import { useEffect, useMemo, useState } from "react"
import ReactSvg from "../../../assets/react.svg"
import { PropType, StateType, Step1Class } from "./Step1"

export class Step3Class extends Step1Class {

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
                <div className="mb-3">
                    <label className="form-label">City</label>
                    <div className="input-group input-group-flat">
                        <span className="input-group-text"></span>
                        <input
                            type="text"
                            className="form-control ps-1"
                            autoComplete="off"
                            name="city"
                            value={this.state.form_data.city}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className="form-hint">
                    </div>
                </div>
                <div>
                    <label className="form-label">Province</label>
                    <div className="input-group input-group-flat">
                        <span className="input-group-text"></span>
                        <input
                            type="text"
                            className="form-control ps-1"
                            autoComplete="off"
                            name="province"
                            value={this.state.form_data.province}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                </div>
                <div>
                    <label className="form-label">Country</label>
                    <div className="input-group input-group-flat">
                        <span className="input-group-text"></span>
                        <input
                            type="text"
                            className="form-control ps-1"
                            autoComplete="off"
                            name="country"
                            value={this.state.form_data.country}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        </>
    }
}

export default function Step3(props: PropType) {

    let methods = useMemo(() => new Step3Class(), []);

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