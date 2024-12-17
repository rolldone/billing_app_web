import { useMemo } from "react";
import Paypal, { PaypalClass, PropType } from "./Paypal";
import { JSX } from "react/jsx-runtime";
import { MidtransDataInfoType } from "../../services/PaymentDestService";

class MidtransClass extends PaypalClass {

    render(): JSX.Element {
        let form_data = this.state.form_data as MidtransDataInfoType
        return <>
            <form className="card">
                <div className="card-header">
                    <h3 className="card-title">Midtrans</h3>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label required">Merchant Code</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="merchant_code"
                                onChange={this.handleChange.bind(this, {})}
                                value={form_data.merchant_code || ""}
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

export default function Midtrans(props: PropType) {

    let methods = useMemo(() => new MidtransClass(), [])

    return <Paypal {...props} stateClass={methods} />
}