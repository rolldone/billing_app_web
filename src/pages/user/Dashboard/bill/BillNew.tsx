import { useMemo, useState } from "react";
import BaseStateClass from "../../components/helper/BaseStateClass";
import { BillType } from "../services/BillService";
import ROUTE_CLICK from "../../../../consts/RouteClick";
import { Link } from "react-router-dom";
import { ProjectType } from "../services/ProjectService";
import { MemberType } from "../services/MemberService";
import SelectMemberModal from "./BillNew/SelectMemberModal";
import SelectProjectModal from "./BillNew/SelectProjectModal";
import BillItemTable from "./BillNew/BillItemTable";

export type StateType = {
    form_data: BillType
    form_error: any
    project_datas: Array<ProjectType>
    member_datas: Array<MemberType>
    show_select_member_modal: boolean
    show_select_project_modal: boolean
}

export type PropType = {

}

export class BillNewClass extends BaseStateClass<StateType, PropType> {

    handleFormDataChange(props: any, e: any) {

    }

    save() {

    }

    handleClick(action: string, e?: any) {
        switch (action) {
            case "SELECT_MEMBER_MODAL":
                this.setState({
                    show_select_member_modal: true
                })
                break;
            case "SELECT_PROJECT_MODAL":
                this.setState({
                    show_select_project_modal: true
                })
                break;
        }
    }

    handleListener(action: string, props?: any) {
        switch (action) {
            case "SELECT_MEMBER_MODAL":
                switch (props.action) {
                    case "SUBMIT":
                        this.setState({
                            form_data: {
                                ...this.state.form_data,
                                member: props.return,
                                member_id: props.return.id
                            }
                        })
                        break;
                    default:
                        break;
                }
                this.setState({
                    show_select_member_modal: false
                })
                break;
            case "SELECT_PROJECT_MODAL":
                switch (props.action) {
                    case "SUBMIT":
                        this.setState({
                            form_data: {
                                ...this.state.form_data,
                                project: props.return,
                                project_id: props.return.id
                            }
                        })
                        break;
                }
                this.setState({
                    show_select_project_modal: false
                })
                break;
        }
    }

    render() {
        let form_data = this.state.form_data
        return <>
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            {/* Page pre-title */}
                            <div className="page-pretitle">Bill</div>
                            <h2 className="page-title">Create New Bill</h2>
                        </div>
                        {/* Page title actions */}
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <span className="d-none d-sm-inline">
                                    <Link to={ROUTE_CLICK["user.bill.list"]} className="btn">
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
                            <h3 className="card-title">Bill form</h3>
                        </div>
                        <div className="card-body">
                            <input type="hidden" value={form_data.id || ""}></input>
                            <div className="mb-3">
                                <div className="form-label">Select Member</div>
                                <div>
                                    <input type="hidden" value={form_data.member_id} />
                                    <input
                                        onClick={this.handleClick.bind(this, "SELECT_MEMBER_MODAL")}
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        aria-readonly
                                        value={form_data.member?.name || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-label">Select Project</div>
                                <div>
                                    <input type="hidden" value={form_data.project_id} />
                                    <input
                                        onClick={this.handleClick.bind(this, "SELECT_PROJECT_MODAL")}
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        aria-readonly
                                        value={form_data.project?.name || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-label">Select Quotation</div>
                                <BillItemTable
                                    name="bill_items"
                                    value={form_data.bill_items || []}
                                    onChange={this.handleFormDataChange.bind(this, {})}
                                    project_id={form_data.project_id || ""}></BillItemTable>
                            </div>
                            {/* <div className="mb-3">
                                <div className="form-label">Select Project</div>
                                <select
                                    name="project_id"
                                    value={form_data.project_id}
                                    onChange={this.handleFormDataChange.bind(this, {})}
                                    className="form-select">
                                    <option value={""}>--</option>
                                    {project_datas.map((val, i) => {
                                        return <option key={val.id} value={val.id}>{val.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <div className="form-label">Bill Name</div>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="name"
                                        onChange={this.handleFormDataChange.bind(this, {})}
                                        value={form_data.name || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-label">Description</div>
                                <div>
                                    <textarea
                                        className="form-control"
                                        placeholder=""
                                        name="description"
                                        onChange={this.handleFormDataChange.bind(this, {})}
                                        value={form_data.description || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-label">Item</div>
                                <ItemTable
                                    name="items"
                                    value={form_data.items || []}
                                    onChange={this.handleFormDataChange.bind(this, {})}></ItemTable>
                            </div>
                            <div className="mb-3">
                                <label className="form-label required">Total</label>
                                <div>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=""
                                        name="total"
                                        onChange={this.handleFormDataChange.bind(this, {})}
                                        value={form_data.total || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label required">Total Tax Price</label>
                                <div>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=""
                                        name="total_tax_price"
                                        onChange={this.handleFormDataChange.bind(this, {})}
                                        value={form_data.total_tax_price || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div> */}
                        </div>
                        <div className="card-footer text-end">
                            <button
                                onClick={this.save.bind(this)}
                                type="submit"
                                className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <SelectProjectModal onListener={this.handleListener.bind(this, "SELECT_PROJECT_MODAL")} show={this.state.show_select_project_modal}></SelectProjectModal>
            <SelectMemberModal onListener={this.handleListener.bind(this, "SELECT_MEMBER_MODAL")} show={this.state.show_select_member_modal}></SelectMemberModal>
        </>
    }
}

export default function BillNew(props: PropType) {

    let methods = useMemo(() => new BillNewClass(), []);

    methods.defineState(useState<StateType>({
        form_data: {},
        form_error: {},
        member_datas: [],
        project_datas: [],
        show_select_member_modal: false,
        show_select_project_modal: false
    }), props);

    return methods.render()
}