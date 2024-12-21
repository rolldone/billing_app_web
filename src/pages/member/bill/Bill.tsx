import { useEffect, useMemo, useState } from "react"
import BaseStateClass from "../../user/components/helper/BaseStateClass"
import BillService, { BillType } from "../services/BillService"
import { useParams } from "react-router-dom"
import { SettingType } from "../../user/services/SettingService"

type PropType = {

}

type StateType = {
    bill_data: BillType
    setting_data: SettingType
}

class BillClass extends BaseStateClass<StateType, PropType> {

    async componentDidMount() {
        this.setBillById(await this.getBillById())
    }

    setSettings() {
        let setting_datas = this.state.bill_data.user?.settings || []
        let setting_data = {} as any
        for (let a = 0; a < setting_datas.length; a++) {
            setting_data[setting_datas[a].name || ""] = setting_datas[a].value
        }
        this.setState({
            setting_data
        })
    }

    async getBillById() {
        try {
            let bill_data = this.state.bill_data
            let resData = await BillService.getById(bill_data.id || "")
            return resData
        } catch (error) {
            console.error("getBillById - err :: ", error);
        }
    }

    setBillById(props: any) {
        if (props == null) return
        let _return = props.return
        this.setState({
            bill_data: _return
        })
        setTimeout(() => {
            this.setSettings()
        }, 1000);
    }

    handleClickPrint(e?: any) {
        window.print()
    }

    render() {
        let setting_data = this.state.setting_data
        let member_data = this.state.bill_data.member
        let bill_data = this.state.bill_data
        let tax_total = 0;
        return <>
            <div className="page-wrapper">
                {/* Page header */}
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <h2 className="page-title">Invoice</h2>
                            </div>
                            {/* Page title actions */}
                            <div className="col-auto ms-auto d-print-none">
                                <button
                                    onClick={this.handleClickPrint.bind(this)}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    {/* Download SVG icon from http://tabler-icons.io/i/printer */}
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
                                        <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                                        <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                                        <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" />
                                    </svg>
                                    Print Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page body */}
                <div className="page-body">
                    <div className="container-xl">
                        <div className="card card-lg">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="h3">{setting_data.office_name}</p>
                                        <address>
                                            {setting_data.address}
                                            <br />
                                            {setting_data.city}, {setting_data.province}
                                            <br />
                                            {setting_data.phone_number}
                                        </address>
                                    </div>
                                    <div className="col-6 text-end">
                                        <p className="h3">{member_data?.name}</p>
                                        <address>
                                            {member_data?.address}
                                            <br />
                                            {member_data?.email}
                                        </address>
                                    </div>
                                    <div className="col-12 my-5">
                                        <h1>Invoice {bill_data.id}</h1>
                                    </div>
                                </div>
                                <table className="table table-transparent table-responsive">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "1%" }} />
                                            <th>Product</th>
                                            <th className="text-center" style={{ width: "1%" }}>
                                                Qnt
                                            </th>
                                            <th className="text-end" style={{ width: "1%" }}>
                                                Tax
                                            </th>
                                            <th className="text-end" style={{ width: "1%" }}>
                                                Total
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(() => {
                                            let arr = [];
                                            let bill_items = bill_data.bill_items || []
                                            for (let a = 0; a < bill_items.length; a++) {
                                                let val = bill_items[a]
                                                tax_total += val.tax_price || 0
                                                arr.push(<tr key={val.id}>
                                                    <td className="text-center">{a + 1}</td>
                                                    <td>
                                                        <p className="strong mb-1">{val.quotation?.name}</p>
                                                        <div className="text-secondary">
                                                            {val.quotation?.description}
                                                        </div>
                                                    </td>
                                                    <td className="text-center">{val.qty}</td>
                                                    <td className="text-end">{val.tax_price}</td>
                                                    <td className="text-end">{val.price}</td>
                                                </tr>)
                                                let items = val.quotation?.items || []
                                                for (let b = 0; b < items.length; b++) {
                                                    let item = items[b]
                                                    arr.push(<tr key={val.id} style={{ "backgroundColor": "#ecf0f1" }}>
                                                        <td className="text-center">{b + 1}</td>
                                                        <td>
                                                            <p className="strong mb-1">{item.name}</p>
                                                            <div className="text-secondary">
                                                                {item.item_description}
                                                            </div>
                                                        </td>
                                                        <td className="text-center">{item.qty}</td>
                                                        <td className="text-end">{item.tax_price}</td>
                                                        <td className="text-end">{item.total}</td>
                                                    </tr>)
                                                }
                                            }
                                            return arr
                                        })()}
                                        <tr>
                                            <td colSpan={4} className="strong text-end">
                                                Subtotal
                                            </td>
                                            <td className="text-end">{bill_data.total_price}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4} className="strong text-end">
                                                Vat Total
                                            </td>
                                            <td className="text-end">{tax_total}</td>
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="font-weight-bold text-uppercase text-end"
                                            >
                                                Total
                                            </td>
                                            <td className="font-weight-bold text-end">{(bill_data.total_price || 0) + tax_total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="text-secondary text-center mt-5">
                                    Thank you very much for doing business with us. We look forward to
                                    working with you again!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer footer-transparent d-print-none">
                    <div className="container-xl">
                        <div className="row text-center align-items-center flex-row-reverse">
                            <div className="col-lg-auto ms-lg-auto">
                                <ul className="list-inline list-inline-dots mb-0">
                                    <li className="list-inline-item">
                                        <a
                                            href="https://tabler.io/docs"
                                            target="_blank"
                                            className="link-secondary"
                                            rel="noopener"
                                        >
                                            Documentation
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="./license.html" className="link-secondary">
                                            License
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            href="https://github.com/tabler/tabler"
                                            target="_blank"
                                            className="link-secondary"
                                            rel="noopener"
                                        >
                                            Source code
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            href="https://github.com/sponsors/codecalm"
                                            target="_blank"
                                            className="link-secondary"
                                            rel="noopener"
                                        >
                                            {/* Download SVG icon from http://tabler-icons.io/i/heart */}
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
                                                className="icon text-pink icon-inline"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                            </svg>
                                            Sponsor
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                                <ul className="list-inline list-inline-dots mb-0">
                                    <li className="list-inline-item">
                                        Copyright © 2024
                                        <a href="." className="link-secondary">
                                            Tabler
                                        </a>
                                        . All rights reserved.
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            href="./changelog.html"
                                            className="link-secondary"
                                            rel="noopener"
                                        >
                                            v1.0.0-beta21
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    }
}

export default function Bill(props: PropType) {

    let params = useParams()

    let methods = useMemo(() => new BillClass(), [])

    methods.defineState(useState<StateType>({
        bill_data: {},
        setting_data: {}
    }), props)

    useEffect(() => {
        console.log("params ", params)
        methods.setState({
            bill_data: {
                id: params.id
            }
        })
        setTimeout(() => {
            methods.componentDidMount()
        }, 1000);
    }, [])

    return methods.render()
}