import { useEffect, useMemo, useState } from "react";
import BaseStateClass from "../../components/helper/BaseStateClass";
import MemberService, { MemberType } from "../services/MemberService";
import { Link } from "react-router-dom";
import ROUTE_CLICK from "../../../../consts/RouteClick";
import { Dropdown } from "react-bootstrap";
import SetUrl from "../../components/helper/SetUrl";

export type StateType = {
    member_datas: Array<MemberType>
}

export type PropType = {

}

export class MemberListClass extends BaseStateClass<StateType, PropType> {

    async mounted() {
        this.setMembers(await this.getMembers())
    }

    async getMembers() {
        try {
            let resData = await MemberService.gets({});
            return resData
        } catch (error) {
            console.error("getMember - error :: ", error)
        }
    }

    setMembers(props: any) {
        if (props == null) return
        let _return = props.return
        this.setState({
            member_datas: _return
        })
    }

    renderHead() {
        return <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        {/* Page pre-title */}
                        <div className="page-pretitle">Member</div>
                        <h2 className="page-title">Member List</h2>
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
                                to={ROUTE_CLICK["user.member.new"]}
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
                                Create new member
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
        let member_datas = this.state.member_datas || []
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
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
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
                                    {member_datas.map((val, i) => {
                                        return <tr key={val.id}>
                                            <td>
                                                <input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice" />
                                            </td>
                                            <td>
                                                <div className="flex-fill">
                                                    <div className="font-weight-medium">{val.name || "No Name"}</div>
                                                    <div className="text-secondary">
                                                        {val.status == "deactivate" ?
                                                            <a href="#" className="text-reset">
                                                                ({val.status})
                                                            </a>
                                                            : null}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-secondary">{val.email}</td>
                                            <td className="text-secondary">{val.phone_number}</td>
                                            <td className="text-secondary">{val.updated_at}</td>
                                            <td>
                                                <Link to={SetUrl(ROUTE_CLICK["user.member.view"], [{ ":id": val.id }])}>Edit</Link>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}

export default function MemberList(props: PropType) {

    let methods = useMemo(() => new MemberListClass(), []);

    methods.defineState(useState<StateType>({
        member_datas: []
    }), props);

    useEffect(() => {
        methods.mounted()
    }, [])

    return methods.render()
}