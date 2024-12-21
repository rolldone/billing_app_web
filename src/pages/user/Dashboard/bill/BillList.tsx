import { useEffect, useMemo, useState } from "react";
import BaseStateClass from "../../components/helper/BaseStateClass";
import { Link } from "react-router-dom";
import ROUTE_CLICK from "../../../../consts/RouteClick";
import BillService, { BillType } from "../services/BillService";
import { Button, Dropdown } from "react-bootstrap";
import SetUrl from "../../components/helper/SetUrl";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NotifUserModal from "./BillList/NotifUserModal";

export type StateType = {
    bill_datas: Array<BillType>
    select_bill_data: BillType
    show_NotifUserModal: boolean
}

export type PropType = {

}

export class BillListClass extends BaseStateClass<StateType, PropType> {

    async mounted() {
        this.setBills(await this.getBills())
    }

    async getBills() {
        try {
            let resData = await BillService.gets({});
            return resData
        } catch (error) {
            console.error("getBill - err :: ", error);
        }

    }

    setBills(props: any) {
        if (props == null) return
        let _return = props.return
        this.setState({
            bill_datas: _return
        })
    }

    renderHead() {
        return <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        {/* Page pre-title */}
                        <div className="page-pretitle">Bill</div>
                        <h2 className="page-title">Bill List</h2>
                    </div>
                    {/* Page title actions */}
                    <div className="col-auto ms-auto d-print-none">
                        <div className="btn-list">
                            <span className="d-none d-sm-inline">
                                <a href="#" className="btn">
                                    New Bill
                                </a>
                            </span>
                            <Link
                                to={ROUTE_CLICK["user.bill.new"]}
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
                                Create new bill
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

    handleClickNotificationUser(props?: any) {
        let bill_data = this.state.bill_datas[props.index]
        this.setState({
            select_bill_data: bill_data,
            show_NotifUserModal: true
        })
    }

    handleNotifUserModalListener(props?: any) {
        this.setState({
            show_NotifUserModal: false
        })
    }

    render() {
        let bill_datas = this.state.bill_datas
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
                                        <th>Project</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Member</th>
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
                                    {bill_datas.map((val, i) => {
                                        return <tr key={val.id}>
                                            <td>
                                                <input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice" />
                                            </td>
                                            <td>
                                                <div className="flex-fill">
                                                    <div className="font-weight-medium">{val.project?.name || "No Name"}</div>
                                                    <div className="text-secondary">
                                                        {val.status == "deactivate" ?
                                                            <a href="#" className="text-reset">
                                                                ({val.status})
                                                            </a>
                                                            : null}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-secondary">{val.total_price}</td>
                                            <td className="text-secondary">{val.status}</td>
                                            <td className="text-secondary">{val.member?.name}</td>
                                            <td className="text-secondary">{val.updated_at}</td>
                                            <td>
                                                <Dropdown as={ButtonGroup}>
                                                    {val.status == "finish" ?
                                                        <Button variant="success" href={SetUrl(ROUTE_CLICK["user.bill.view"], [{ ":id": val.id }])}>View</Button>
                                                        :
                                                        <Button variant="success" href={SetUrl(ROUTE_CLICK["user.bill.view"], [{ ":id": val.id }])}>Edit</Button>
                                                    }

                                                    {val.status != "finish" ?
                                                        <>
                                                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                                            <Dropdown.Menu>
                                                                {/* <Dropdown.Item onClick={this.handleClickDelete.bind(this, { index: i })}>Delete</Dropdown.Item> */}
                                                                <Dropdown.Item onClick={this.handleClickNotificationUser.bind(this, { index: i })}>Notif</Dropdown.Item>
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
            <NotifUserModal
                show={this.state.show_NotifUserModal}
                bill_data={this.state.select_bill_data}
                onListener={this.handleNotifUserModalListener.bind(this)}></NotifUserModal>
        </>
    }
}

export default function BillList(props: PropType) {
    let methods = useMemo(() => new BillListClass(), []);

    methods.defineState(useState<StateType>({
        bill_datas: [],
        select_bill_data: {},
        show_NotifUserModal: false
    }), props);

    useEffect(() => {
        methods.mounted()
    }, [])

    return methods.render()
}