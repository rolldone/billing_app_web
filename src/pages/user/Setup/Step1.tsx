import { useEffect, useMemo, useState } from "react";
import BaseStateClass from "../components/helper/BaseStateClass";
import ReactSvg from "../../../assets/react.svg"
import { SettingType } from "../services/SettingService";
import { debounce, DebouncedFunc } from "lodash-es";
import timezone from "../components/helper/json/TimeZone.json"

export type StateType = {
    form_data: SettingType
}

export type PropType = {
    value: SettingType
    name: string
    onChange: {
        (props: {
            target: {
                value: SettingType
                name: string
            }
        }): void
    }
}

export class Step1Class extends BaseStateClass<StateType, PropType> {
    declare pendingOnChange: DebouncedFunc<any>
    handleChange(e?: any) {
        let form_data = this.state.form_data
        switch (e.target.name) {
            default:
                form_data = {
                    ...form_data,
                    [e.target.name]: e.target.value
                }
                break;
        }
        this.setState({
            form_data
        })
        if (this.pendingOnChange != null) {
            this.pendingOnChange.cancel()
        }
        this.pendingOnChange = debounce(() => {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: this.state.form_data
                }
            })
        }, 1000)
        this.pendingOnChange()
    }

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
                    <label className="form-label">Office Name</label>
                    <div className="input-group input-group-flat">
                        <span className="input-group-text"></span>
                        <input
                            type="text"
                            className="form-control ps-1"
                            autoComplete="off"
                            name="office_name"
                            value={this.state.form_data.office_name}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className="form-hint">
                        Choose a URL that describes you or your business in a concise way.
                    </div>
                </div>
                <div>
                    <label className="form-label">Timezone</label>
                    <select
                        className="form-select mb-0"
                        value={this.state.form_data.timezone}
                        name="timezone"
                        onChange={this.handleChange.bind(this)}>
                        <option value="">--</option>
                        {timezone.map((val, i) => {
                            return <option key={JSON.stringify(val)} value={val.utc[0]}>{val.text}</option>
                        })}
                    </select>
                </div>
            </div>
        </>
    }
}

export default function Step1(props: PropType) {
    let methods = useMemo(() => new Step1Class(), []);

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