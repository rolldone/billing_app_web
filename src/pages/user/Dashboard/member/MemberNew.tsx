import { useMemo, useState } from "react";
import BaseStateClass from "../../components/helper/BaseStateClass";
import MemberService, { MemberType } from "../services/MemberService";
import { Link } from "react-router-dom";
import ROUTE_CLICK from "../../../../consts/RouteClick";

export type StateType = {
    form_data: MemberType
    form_error: any
}

export type PropType = {

}

export class MemberNewClass extends BaseStateClass<StateType, PropType> {

    handleFormDataChange(props: any, e?: any) {
        let form_data = this.state.form_data;
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
    }

    async save() {
        try {
            let form_data = this.state.form_data
            let resData = await MemberService.add(form_data)
            alert("Insert data member success")
        } catch (error) {
            console.error("save - error :: ", error);
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
                            <div className="page-pretitle">Member</div>
                            <h2 className="page-title">Create New Member</h2>
                        </div>
                        {/* Page title actions */}
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <span className="d-none d-sm-inline">
                                    <Link to={ROUTE_CLICK["user.member"]} className="btn">
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
                            <h3 className="card-title">Member form</h3>
                        </div>
                        <div className="card-body">
                            <input type="hidden" value={form_data.id || ""}></input>
                            <div className="mb-3">
                                <label className="form-label required">Full Name</label>
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder=""
                                        value={form_data.name || ""}
                                        onChange={this.handleFormDataChange.bind(this, {})}
                                    />
                                    <small className="form-hint">
                                        We'll never share your email with anyone else.
                                    </small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label required">Phone Number</label>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="phone_number"
                                        onChange={this.handleFormDataChange.bind(this, {})}
                                        value={form_data.phone_number || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label required">Email</label>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="email"
                                        onChange={this.handleFormDataChange.bind(this, {})}
                                        value={form_data.email || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label required">Address</label>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="address"
                                        onChange={this.handleFormDataChange.bind(this, {})}
                                        value={form_data.address || ""}
                                    />
                                    <small className="form-hint">
                                        Your password must be 8-20 characters long, contain letters and
                                        numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <div>
                                    <select
                                        className="form-select"
                                        name="status" 
                                        value={form_data.status || ""}
                                        onChange={this.handleFormDataChange.bind(this, {})}>
                                        <option value={""}>--</option>
                                        <option value="active">Active</option>
                                        <option value="deactivate">Deactivate</option>
                                    </select>
                                </div>
                            </div>

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
        </>
    }
}

export default function MemberNew(props: PropType) {
    let methods = useMemo(() => new MemberNewClass(), []);

    methods.defineState(useState<StateType>({
        form_data: {},
        form_error: {}
    }), props);

    return methods.render();
}