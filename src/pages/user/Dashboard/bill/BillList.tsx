import { useMemo, useState } from "react";
import BaseStateClass from "../../components/helper/BaseStateClass";
import { Link } from "react-router-dom";
import ROUTE_CLICK from "../../../../consts/RouteClick";

export type StateType = {

}

export type PropType = {

}

export class BillListClass extends BaseStateClass<StateType, PropType> {

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

    render() {
        return <>
            {this.renderHead()}
            <div className="page-body">
                <div className="container-xl">

                </div>
            </div>
        </>
    }
}

export default function BillList(props: PropType) {
    let methods = useMemo(() => new BillListClass(), []);

    methods.defineState(useState<StateType>({}), props);

    return methods.render()
}