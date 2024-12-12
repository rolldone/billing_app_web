import { useEffect, useMemo, useState } from "react"
import BaseStateClass from "../../../components/helper/BaseStateClass"
import SelectQuotationModal from "./SelectQuotationModal"
import { BillItemType } from "../../services/BillService"
import { debounce, DebouncedFunc } from "lodash-es"

type PropType = {
    project_id: string
    name: string
    value: Array<BillItemType>
    onChange: {
        (props: {
            target: {
                name: string
                value: Array<BillItemType>
            }
        }): void
    }
}

type StateType = {
    show_select_quotation_modal: boolean
    quotation_data: BillItemType
    bill_item_datas: Array<BillItemType>
}

class BillItemTableClass extends BaseStateClass<StateType, PropType> {
    declare pendingChange: DebouncedFunc<any>
    handleListener(action: string, props: any) {
        let bill_item_datas = this.state.bill_item_datas || []
        switch (action) {
            case "SELECT_QUOTATION_MODAL_LISTENER":
                if (props.action == "SUBMIT") {
                    bill_item_datas.push({
                        quotation: props.return,
                        quotation_id: props.return.id
                    })
                }
                this.setState({
                    show_select_quotation_modal: false
                })
                if (this.pendingChange != null) {
                    this.pendingChange.cancel()
                }
                this.pendingChange = debounce(() => {
                    this.props.onChange({
                        target: {
                            name: this.props.name,
                            value: bill_item_datas
                        }
                    })
                }, 1000)
                this.pendingChange()
                break;
        }
    }

    handleClickShowQuotationModal(e?: any) {
        this.setState({
            show_select_quotation_modal: true
        })
    }

    render() {
        let bill_item_datas = this.state.bill_item_datas || []
        return <>
            <SelectQuotationModal show={this.state.show_select_quotation_modal} onListener={this.handleListener.bind(this, "SELECT_QUOTATION_MODAL_LISTENER")}></SelectQuotationModal>
            <div>
                <button className="btn btn-primary mb-3" onClick={this.handleClickShowQuotationModal.bind(this)}>Add</button>
            </div>
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-vcenter table-mobile-md card-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Role</th>
                                <th className="w-1" />
                            </tr>
                        </thead>
                        <tbody>
                            {bill_item_datas.map((val, i) => {
                                return <tr key={val.quotation_id + "-" + i}>
                                    <td data-label="Title">
                                        <div>{val.quotation?.name}</div>
                                        <div className="text-secondary">{val.quotation?.description}</div>
                                    </td>
                                    <td data-label="Title">
                                        <div>{val.quotation?.total}</div>
                                        <div className="text-secondary">{val.quotation?.description}</div>
                                    </td>
                                    <td className="text-secondary" data-label="Role">
                                        User
                                    </td>
                                    <td>
                                        <div className="btn-list flex-nowrap">
                                            <a href="#" className="btn">
                                                Edit
                                            </a>
                                            <div className="dropdown">
                                                <button
                                                    className="btn dropdown-toggle align-text-top"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    Actions
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <a className="dropdown-item" href="#">
                                                        Action
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Another action
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    }
}

export default function BillItemTable(props: PropType) {

    let methods = useMemo(() => new BillItemTableClass(), []);

    methods.defineState(useState<StateType>({
        show_select_quotation_modal: false,
        quotation_data: {},
        bill_item_datas: props.value
    }), props);

    useEffect(() => {
        methods.setState({
            bill_item_datas: props.value
        })
    }, [props.value])

    return methods.render()
}