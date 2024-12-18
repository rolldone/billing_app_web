import { useEffect, useMemo, useState } from "react";
import BaseStateClass from "../../components/helper/BaseStateClass";
import { Link } from "react-router-dom";
import ROUTE_CLICK from "../../../../consts/RouteClick";
import PaymentService, { PaymentType } from "../services/PaymentService";
import { Button, Dropdown } from "react-bootstrap";
import SetUrl from "../../components/helper/SetUrl";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Validate from "./PaymentList/Validate";

export type StateType = {
    payment_datas: Array<PaymentType>
    show_PaymentValidate: boolean
    select_payment_data: PaymentType
}

export type PropType = {

}

export class PaymentClass extends BaseStateClass<StateType, PropType> {
    async mounted() {
        this.setPayments(await this.getPayments())
    }

    async getPayments() {
        try {
            let resData = await PaymentService.gets({});
            return resData
        } catch (error) {
            console.error("getPayment - error :: ", error)
        }
    }

    setPayments(props: any) {
        if (props == null) return
        let _return = props.return
        this.setState({
            payment_datas: _return
        })
    }

    handleClickValidate(props?: any, e?: any) {
        let payment_datas = this.state.payment_datas
        this.setState({
            show_PaymentValidate: true,
            select_payment_data: payment_datas[props.index]
        })
    }

    handleClickDelete(props?: any, e?: any) {

    }

    handleValidateListener(props: any) {
        if (props.action == "SUBMIT") {

        }
        this.setState({
            select_payment_data: {},
            show_PaymentValidate: false
        })
    }

    renderHead() {
        return <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        {/* Page pre-title */}
                        <div className="page-pretitle">Payment</div>
                        <h2 className="page-title">Payment List</h2>
                    </div>
                    {/* Page title actions */}
                    <div className="col-auto ms-auto d-print-none">
                        <div className="btn-list">
                            <span className="d-none d-sm-inline">
                                <a href="#" className="btn">
                                    New view
                                </a>
                            </span>
                            <Link
                                to={ROUTE_CLICK["user.payment.new"]}
                                className="btn btn-primary d-none d-sm-inline-block"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-report"
                            >
                                {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>
                                Create new payment
                            </Link>
                            <a
                                href="#"
                                className="btn btn-primary d-sm-none btn-icon"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-report"
                                aria-label="Create new report"
                            >
                                {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    render() {
        let payment_datas = this.state.payment_datas || []
        return <>
            {this.renderHead()}
            <div className="page-body">
                <div className="container-xl">
                    <div className="card">
                        <div className="table-responsive" style={{ minHeight: "500px" }}>
                            <table className="table table-vcenter card-table">
                                <thead>
                                    <tr>
                                        <th className="w-1">
                                            <input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices" />
                                        </th>
                                        <th>Id</th>
                                        <th>Status</th>
                                        <th>Total Price</th>
                                        <th>Updated at</th>
                                        {/* <th className="w-1" /> */}
                                        <th>
                                            <Dropdown>
                                                <Dropdown.Toggle size="sm" id="dropdown-basic">
                                                    -
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Load Data</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payment_datas.map((val, i) => {
                                        return <tr key={val.id}>
                                            <td>
                                                <input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice" />
                                            </td>
                                            <td>{val.id}</td>
                                            <td className="text-secondary">{val.status}</td>
                                            <td className="text-secondary">{val.bill?.total_price}</td>
                                            <td className="text-secondary">{val.updated_at}</td>
                                            <td>
                                                <Dropdown as={ButtonGroup}>
                                                    {val.status == "finish" ?
                                                        <Button variant="success" href={SetUrl(ROUTE_CLICK["user.payment.view"], [{ ":id": val.id }])}>View</Button>
                                                        :
                                                        <Button variant="success" href={SetUrl(ROUTE_CLICK["user.payment.view"], [{ ":id": val.id }])}>Edit</Button>
                                                    }

                                                    {val.status != "finish" ?
                                                        <>
                                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={this.handleClickDelete.bind(this, { index: i })}>Delete</Dropdown.Item>
                                                                <Dropdown.Item onClick={this.handleClickValidate.bind(this, { index: i })}>Validate</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </> : null}
                                                </Dropdown>
                                                {/* <Link to={SetUrl(ROUTE_CLICK["user.payment.view"], [{ ":id": val.id }])}>Edit</Link> */}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Validate
                show={this.state.show_PaymentValidate}
                onListener={this.handleValidateListener.bind(this)}
                payment_data={this.state.select_payment_data}></Validate>
        </>
    }
}

export default function Payment(props: PropType) {

    let methods = useMemo(() => new PaymentClass(), []);

    methods.defineState(useState<StateType>({
        payment_datas: [],
        show_PaymentValidate: false,
        select_payment_data: {}
    }), props);

    useEffect(() => {
        methods.mounted()
    }, [])

    return methods.render()
}