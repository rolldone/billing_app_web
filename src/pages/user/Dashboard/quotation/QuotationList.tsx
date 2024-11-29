import { useEffect, useMemo, useState } from "react"
import BaseStateClass from "../../components/helper/BaseStateClass"
import { Link } from "react-router-dom"
import ROUTE_CLICK from "../../../../consts/RouteClick"
import { Dropdown } from "react-bootstrap"
import QuotationService, { QuotationType } from "../services/QuotationService"
import SetUrl from "../../components/helper/SetUrl"

export type StateType = {
    quotation_datas: Array<QuotationType>
}

export type PropType = {

}

export class QuotationListClass extends BaseStateClass<StateType, PropType> {

    async mounted() {
        this.setQuotations(await this.getQuotations())
    }

    async getQuotations() {
        try {
            let resData = await QuotationService.gets({});
            return resData
        } catch (error) {
            console.error("getQuotations - err :: ", error);
        }
    }

    setQuotations(props: any) {
        if (props == null) return
        let _return = props.return
        this.setState({
            quotation_datas: _return
        })
    }

    renderHead() {
        return <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        {/* Page pre-title */}
                        <div className="page-pretitle">Project</div>
                        <h2 className="page-title">Project List</h2>
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
                                to={ROUTE_CLICK["user.quotation.new"]}
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
                                Create new quotation
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
        let quotation_datas = this.state.quotation_datas || []
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
                                        <th>Price</th>
                                        <th>Tax</th>
                                        <th>Tax Type</th>
                                        <th>Description</th>
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
                                    {quotation_datas.map((val, i) => {
                                        return <tr key={val.id}>
                                            <td>
                                                <input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice" />
                                            </td>
                                            <td>{val.project?.name}</td>
                                            <td className="text-secondary">{val.price}</td>
                                            <td className="text-secondary">{val.tax_percent}</td>
                                            <td className="text-secondary">{val.tax_type}</td>
                                            <td className="text-secondary">{val.updated_at}</td>
                                            <td>
                                                <Link to={SetUrl(ROUTE_CLICK["user.quotation.view"], [{ ":id": val.id }])}>Edit</Link>
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

export default function QuotationList(props: PropType) {
    let methods = useMemo(() => new QuotationListClass(), []);

    methods.defineState(useState<StateType>({
        quotation_datas: []
    }), props);

    useEffect(() => {
        methods.mounted()
    }, [])

    return methods.render()
}