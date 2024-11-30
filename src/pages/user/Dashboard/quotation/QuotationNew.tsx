import { useEffect, useMemo, useState } from "react"
import BaseStateClass from "../../components/helper/BaseStateClass"
import QuotationService, { ItemType, QuotationType } from "../services/QuotationService"
import { Link } from "react-router-dom"
import ROUTE_CLICK from "../../../../consts/RouteClick"
import ItemTable from "./QuotationNew/ItemTable"
import ProjectService, { ProjectType } from "../services/ProjectService"

export type StateType = {
    form_data: QuotationType
    form_error: any
    project_datas: Array<ProjectType>
}

export type PropType = {

}

export class QuotationNewClass extends BaseStateClass<StateType, PropType> {
    async mounted() {
        this.setProjects(await this.getProjects())
    }
    async getProjects() {
        try {
            let resData = await ProjectService.gets({})
            return resData;
        } catch (error) {
            console.error("getProjects - err :: ", error)
        }
    }
    setProjects(props: any) {
        if (props == null) return
        let _return = props.return
        this.setState({
            project_datas: _return
        })
    }
    handleFormDataChange(props: any, e: any) {
        let form_data = this.state.form_data
        switch (e.target.name) {
            case "items":
                let items = e.target.value as Array<ItemType>
                let total = 0;
                let total_tax_price = 0;
                items.some((val) => {
                    total += val.total
                    total_tax_price += (val.tax_price || 0)
                })
                form_data = {
                    ...form_data,
                    [e.target.name]: e.target.value,
                    total,
                    total_tax_price
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
    }

    async save() {
        try {
            let form_data = this.state.form_data
            await QuotationService.add(form_data)
            debugger;
        } catch (error) {
            console.error("save - err :: ", error)
        }
    }

    render() {
        let form_data = this.state.form_data
        let project_datas = this.state.project_datas
        return <>
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            {/* Page pre-title */}
                            <div className="page-pretitle">Quotation</div>
                            <h2 className="page-title">Create New Quotation</h2>
                        </div>
                        {/* Page title actions */}
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                <span className="d-none d-sm-inline">
                                    <Link to={ROUTE_CLICK["user.quotation"]} className="btn">
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
                            <h3 className="card-title">Quotation form</h3>
                        </div>
                        <div className="card-body">
                            <input type="hidden" value={form_data.id || ""}></input>
                            <div className="mb-3">
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
                                <div className="form-label">Quotation Name</div>
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

export default function QuotationNew(props: any) {
    let methods = useMemo(() => new QuotationNewClass(), []);

    methods.defineState(useState<StateType>({
        form_data: {},
        form_error: {},
        project_datas: []
    }), props);

    useEffect(() => {
        methods.mounted()
    }, [])

    return methods.render()
}