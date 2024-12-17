import { useMemo } from "react";
import BaseStateClass from "../components/helper/BaseStateClass";
import { Link } from "react-router-dom";
import ROUTE_CLICK from "../../../consts/RouteClick";

export type StateType = {

}

export type PropType = {

}

export class SideMenuClass extends BaseStateClass<StateType, PropType> {

    render() {
        return <ul className="navbar-nav pt-lg-3">
            <li className="nav-item">
                <a className="nav-link" href="./">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/home */}
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
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                    </span>
                    <span className="nav-link-title">Dashboard</span>
                </a>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={ROUTE_CLICK["user.payment_dest.list"]}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/checkbox */}
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
                            <path d="M9 11l3 3l8 -8" />
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                        </svg>
                    </span>
                    <span className="nav-link-title">Payment Destination</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to={ROUTE_CLICK["user.project.list"]}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/checkbox */}
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
                            <path d="M9 11l3 3l8 -8" />
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                        </svg>
                    </span>
                    <span className="nav-link-title">Project</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={ROUTE_CLICK["user.quotation"]}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/ghost */}
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
                            <path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" />
                            <path d="M10 10l.01 0" />
                            <path d="M14 10l.01 0" />
                            <path d="M10 14a3.5 3.5 0 0 0 4 0" />
                        </svg>
                    </span>
                    <span className="nav-link-title">Quotation</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={ROUTE_CLICK["user.member"]}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/brand-figma */}
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
                            <path d="M15 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            <path d="M6 3m0 3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v0a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3z" />
                            <path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15" />
                        </svg>
                    </span>
                    <span className="nav-link-title">Member</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={ROUTE_CLICK["user.bill.list"]}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/ghost */}
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
                            <path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" />
                            <path d="M10 10l.01 0" />
                            <path d="M14 10l.01 0" />
                            <path d="M10 14a3.5 3.5 0 0 0 4 0" />
                        </svg>
                    </span>
                    <span className="nav-link-title">Bill</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={ROUTE_CLICK["user.payment"]}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/mail-opened */}
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
                            <path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
                            <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                            <path d="M3 19l6 -6" />
                            <path d="M15 13l6 6" />
                        </svg>
                    </span>
                    <span className="nav-link-title">Payment</span>
                </Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="./illustrations.html">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/brand-figma */}
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
                            <path d="M15 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            <path d="M6 3m0 3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v0a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3z" />
                            <path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15" />
                        </svg>
                    </span>
                    <span className="nav-link-title">Setting</span>
                </a>
            </li>
            
        </ul>
    }
}

export default function SideMenu(props: PropType) {
    let methods = useMemo(() => new SideMenuClass(), [])
    return methods.render();
}