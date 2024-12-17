import { useEffect, useMemo, useState } from "react";
import BaseStateClass from "../../../components/helper/BaseStateClass";
import { BankTransferDataInfoType, CashDataInfoType, MidtransDataInfoType, PaypalDataInfoType } from "../../services/PaymentDestService";
import { debounce, DebouncedFunc } from "lodash-es";

type AllDataInfoType = PaypalDataInfoType | BankTransferDataInfoType | MidtransDataInfoType | CashDataInfoType
export type StateType = {
    form_data: AllDataInfoType
}

export type PropType = {
    value: AllDataInfoType
    name: string
    onChange: {
        (e: {
            target: {
                name: string
                value: AllDataInfoType
            }
        }): void
    }
    stateClass?: PaypalClass
}

export class PaypalClass extends BaseStateClass<StateType, PropType> {

    declare pendingState: DebouncedFunc<any>

    handleChange(props?: any, e?: any) {
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

        if (this.pendingState != null) {
            this.pendingState.cancel()
        }

        this.pendingState = debounce(() => {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: form_data as PaypalDataInfoType
                }
            })
        }, 1000)

        this.pendingState()
    }

    render() {
        let form_data = this.state.form_data as PaypalDataInfoType
        return <>
            <form className="card">
                <div className="card-header">
                    <h3 className="card-title">Paypal</h3>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label required">Address</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="address"
                                onChange={this.handleChange.bind(this, {})}
                                value={form_data.address || ""}
                            />
                            <small className="form-hint">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>
                </div>
            </form>

        </>
    }
}

export default function Paypal(props: PropType) {

    let methods = props.stateClass || useMemo(() => new PaypalClass(), []);

    methods.defineState(useState<StateType>({
        form_data: props.value
    }), props)

    useEffect(() => {
        methods.setState({
            form_data: props.value
        })
    }, [props.value])

    return methods.render()
}