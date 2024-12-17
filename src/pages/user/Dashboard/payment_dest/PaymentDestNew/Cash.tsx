import { useMemo } from "react";
import Paypal, { PaypalClass, PropType } from "./Paypal";
import { JSX } from "react/jsx-runtime";
import { CashDataInfoType } from "../../services/PaymentDestService";

export class CashClass extends PaypalClass {

    render(): JSX.Element {
        let form_data = this.state.form_data as CashDataInfoType
        return <form className="card">
            <div className="card-header">
                <h3 className="card-title">Cash</h3>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label required">Cash Name</label>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            name="cash_name"
                            onChange={this.handleChange.bind(this, {})}
                            value={form_data.cash_name || ""}
                        />
                        <small className="form-hint">
                            Your password must be 8-20 characters long, contain letters and
                            numbers, and must not contain spaces, special characters, or emoji.
                        </small>
                    </div>
                </div>
            </div>
        </form>

    }
}

export default function Cash(props: PropType) {
    let methods = useMemo(() => new CashClass(), []);
    return <Paypal {...props} stateClass={methods} />
}