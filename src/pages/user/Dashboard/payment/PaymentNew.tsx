import { useEffect, useMemo, useState } from "react";
import BaseStateClass from "../../components/helper/BaseStateClass";
import PaymentService, { PaymentType } from "../services/PaymentService";
import { Link } from "react-router-dom";
import ROUTE_CLICK from "../../../../consts/RouteClick";
import SelectBillModal from "./PaymentNew/SelectBillModal";
import PaymentDestService, { PaymentDestType } from "../services/PaymentDestService";
import { DebouncedFunc } from "lodash-es";
const BASE_API_URL = import.meta.env.VITE_PUBLIC_MASTER_DATA_API;
const TOKEN = window.localStorage.getItem("token") || ""

export type StateType = {
    form_data: PaymentType
    payment_dest_datas: Array<PaymentDestType>
    form_error: any
    show_select_bill_modal: boolean
}

export type PropType = {

}

export class PaymentNewClass extends BaseStateClass<StateType, PropType> {
    declare pendingOnChange: DebouncedFunc<any>
    async mounted() {
        this.setPaymentDests(await this.getPaymentDests());
    }

    handleFormDataChange(props: any, e?: any) {
        let form_data = this.state.form_data;
        switch (e.target.name) {
            case "attach_file":
                form_data = {
                    ...form_data,
                    [e.target.name]: e.target.files?.[0]
                }
                break;
            case "amount":
                let remaining = form_data.remaining || 0;
                let amount = parseFloat(e.target.value)
                let new_remaining = remaining - (amount || 0)
                form_data = {
                    ...form_data,
                    [e.target.name]: amount,
                    new_remaining
                }
                break;
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
        if (e.target.name == "payment_from") {
            this.mounted()
        }
    }

    async getPaymentDests() {
        try {
            let form_data = this.state.form_data;
            let resData = await PaymentDestService.gets({
                payment_type: form_data.payment_from
            });
            return resData
        } catch (error) {
            console.error("getPaymentDests - err :: ", error);
        }
    }

    setPaymentDests(props: any) {
        if (props == null) return;
        let _return = props.return
        this.setState({
            payment_dest_datas: _return
        })
    }

    async save() {
        try {
            let form_data = this.state.form_data
            let resData = await PaymentService.add(form_data)
            let _return = resData.return;
            form_data = {
                ...form_data,
                ..._return
            }
            this.setState({
                form_data
            })
            alert("Insert data payment success")
        } catch (error) {
            console.error("save - error :: ", error);
        }
    }

    handleListener(action: string, props?: any) {
        switch (action) {
            case "SELECT_BILL_MODAL_LISTENER":
                if (props.action == "SUBMIT") {
                    this.setState({
                        form_data: {
                            ...this.state.form_data,
                            bill: props.return,
                            bill_id: props.return.id,
                        }
                    })
                }
                this.setState({
                    show_select_bill_modal: false
                })
                setTimeout(() => {
                    this.calculateRemaining()
                }, 1000);
                break;
        }
    }

    calculateRemaining() {
        let payments = this.state.form_data.bill?.payments || []
        let remaining = 0;
        for (let a = 0; a < payments.length; a++) {
            remaining += payments[a].amount || 0
        }
        remaining = (this.state.form_data.bill?.total_price || 0) - remaining

        let new_remaining = remaining - (this.state.form_data.amount || 0)
        this.setState({
            form_data: {
                ...this.state.form_data,
                remaining,
                new_remaining
            }
        })
    }

    handleClick(action: string, props?: any, e?: any) {
        switch (action) {
            case "SELECT_BILL_MODAL":
                this.setState({
                    show_select_bill_modal: true
                })
                break;
        }
    }

    print(index: string) {

    }

    render() {
        let form_data = this.state.form_data
        return <>
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            {/* Page pre-title */}
                            <div className="page-pretitle">Payment</div>
                            <h2 className="page-title">Create New Payment</h2>
                        </div>
                        {/* Page title actions */}
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <span className="d-none d-sm-inline">
                                    <Link to={ROUTE_CLICK["user.payment.list"]} className="btn">
                                        Back
                                    </Link>
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="container-xl">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Payment form</h3>
                        </div>
                        <div className="card-body">
                            <div className="card mb-3">
                                <div className="card-status-start bg-green" />
                                <div className="card-body">
                                    <h3 className="card-title">This is manual payment</h3>
                                    <p className="text-secondary">
                                        Mencatat setiap transaksi secara mandiri atau manual adalah langkah penting dalam menjaga keakuratan dan ketertiban catatan keuangan. Hal ini membantu dalam memonitor transaksi dengan lebih baik, serta memastikan bahwa tidak ada transaksi yang terlewatkan.
                                    </p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <input type="hidden" value={form_data.id || ""}></input>
                                <div className="form-label">Select Bill</div>
                                <div>
                                    <input type="hidden" name="bill_id" value={form_data.bill_id || ""} />
                                    <input
                                        onClick={this.handleClick.bind(this, "SELECT_BILL_MODAL")}
                                        type="text"
                                        className="form-control"
                                        aria-readonly
                                        defaultValue={form_data.bill?.id || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Payment From</label>
                                <div>
                                    <select
                                        className="form-select"
                                        name="payment_from" value={form_data.payment_from || ""}
                                        onChange={this.handleFormDataChange.bind(this, {})}>
                                        <option value={""}>--</option>
                                        <option value="paypal">Paypal</option>
                                        <option value="bank_transfer">Bank Transfer</option>
                                        <option value="midtrans">Midtrans</option>
                                        <option value="ipaymu">Ipaymu</option>
                                        <option value="stripe">Stripe</option>
                                        <option value="wise">Wise</option>
                                        <option value="cash">Cash</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Payment Destination</label>
                                <div>
                                    <select
                                        className="form-select"
                                        name="payment_dest_id" value={form_data.payment_dest_id || ""}
                                        onChange={this.handleFormDataChange.bind(this, {})}>
                                        <option value={""}>--</option>
                                        {this.state.payment_dest_datas.map((val, i) => {
                                            return <option key={val.id} value={val.id}>{val.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label required">Total</label>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder=""
                                        readOnly
                                        disabled
                                        defaultValue={form_data.bill?.total_price || ""}
                                    />
                                    <small className="form-hint">
                                        We'll never share your email with anyone else.
                                    </small>
                                </div>
                            </div>
                            {form_data.bill?.type == "debt" ? <>
                                <div className="mb-3">
                                    <label className="form-label required">Remaining</label>
                                    <div>
                                        <input
                                            type="number"
                                            name="remaining"
                                            readOnly
                                            onChange={this.handleFormDataChange.bind(this, {})}
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            disabled
                                            value={form_data.remaining || ""}
                                        />
                                        <small className="form-hint">
                                            We'll never share your email with anyone else.
                                        </small>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label required">Amount</label>
                                    <div>
                                        <input
                                            type="number"
                                            name="amount"
                                            onChange={this.handleFormDataChange.bind(this, {})}
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            value={form_data.amount || ""}
                                        />
                                        <small className="form-hint">
                                            We'll never share your email with anyone else.
                                        </small>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label required">New Remaining</label>
                                    <div>
                                        <input
                                            type="number"
                                            name="new_remaining"
                                            onChange={this.handleFormDataChange.bind(this, {})}
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            readOnly
                                            disabled
                                            value={form_data.new_remaining || ""}
                                        />
                                        <small className="form-hint">
                                            We'll never share your email with anyone else.
                                        </small>
                                    </div>
                                </div>
                            </> : null}
                            <div className="mb-3">
                                <label className="form-label required">Attach File</label>
                                <div>
                                    <input
                                        type="file"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder=""
                                        name="attach_file"
                                        onChange={this.handleFormDataChange.bind(this, {})}
                                    />
                                    <small className="form-hint">
                                        We'll never share your email with anyone else.
                                    </small>
                                </div>
                            </div>
                            {(form_data.bill_id != null && (typeof form_data.attach_file as any) == 'string') ?
                                <div className="mb-3">
                                    {this.isImageFile(form_data.attach_file || "") == true ?
                                        <img src={BASE_API_URL + "/api/payment/file/" + form_data.attach_file + "?token=" + TOKEN} />
                                        :
                                        <div>
                                        </div>}
                                </div>
                                : null}
                        </div>
                        <div className="card-footer text-end">
                            {form_data.status == "finish" ?
                                <button
                                    onClick={this.print.bind(this, form_data.id || "")}
                                    type="submit"
                                    className="btn btn-primary">
                                    Print
                                </button>
                                :
                                <button
                                    onClick={this.save.bind(this)}
                                    type="submit"
                                    className="btn btn-primary">
                                    Submit
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <SelectBillModal
                show={this.state.show_select_bill_modal}
                onListener={this.handleListener.bind(this, "SELECT_BILL_MODAL_LISTENER")}></SelectBillModal>
        </>
    }

    isImageFile(filename: string): boolean {
        // Define the valid image extensions 
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".bmp", ".webp"];
        // Get the file extension 
        const extension = filename.slice((Math.max(0, filename.lastIndexOf(".")) || Infinity) + 1).toLowerCase();
        // Check if the extension is in the list of image extensions 
        if (imageExtensions.includes(`.${extension}`)) {
            return true;
        } else {
            return false;
        }
    }
}

export default function PaymentNew(props: PropType) {
    let methods = useMemo(() => new PaymentNewClass(), []);

    methods.defineState(useState<StateType>({
        form_data: {
            type: "manual",
            status: "pending"
        },
        form_error: {},
        show_select_bill_modal: false,
        payment_dest_datas: []
    }), props);

    useEffect(() => {
        methods.mounted()
    }, [])

    return methods.render();
}