import { useMemo } from "react";
import Paypal, { PaypalClass, PropType } from "./Paypal";
import { JSX } from "react/jsx-runtime";
import { BankTransferDataInfoType } from "../../services/PaymentDestService";

class BankTransferClass extends PaypalClass {

    render(): JSX.Element {
        let form_data = this.state.form_data as BankTransferDataInfoType
        return <>
            <form className="card">
                <div className="card-header">
                    <h3 className="card-title">Bank Transfer</h3>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label required">Bank Name</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="bank_name"
                                onChange={this.handleChange.bind(this, {})}
                                value={form_data.bank_name || ""}
                            />
                            <small className="form-hint">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Bank Holder Name</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="account_name"
                                onChange={this.handleChange.bind(this, {})}
                                value={form_data.account_name || ""}
                            />
                            <small className="form-hint">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Bank Account Number</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="account_number"
                                onChange={this.handleChange.bind(this, {})}
                                value={form_data.account_number || ""}
                            />
                            <small className="form-hint">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Bank Branch Code</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="branch_code"
                                onChange={this.handleChange.bind(this, {})}
                                value={form_data.branch_code || ""}
                            />
                            <small className="form-hint">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Bank Swift Code</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="swift_code"
                                onChange={this.handleChange.bind(this, {})}
                                value={form_data.swift_code || ""}
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

export default function BankTransfer(props: PropType) {

    let methods = useMemo(() => new BankTransferClass(), [])

    return <Paypal {...props} stateClass={methods} />
}