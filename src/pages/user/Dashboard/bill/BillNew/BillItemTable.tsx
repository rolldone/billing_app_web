import { useEffect, useMemo, useState } from "react"
import BaseStateClass from "../../../components/helper/BaseStateClass"
import SelectQuotationModal from "./SelectQuotationModal"
import { BillItemType } from "../../services/BillService"
import { debounce, DebouncedFunc } from "lodash-es"
import { Dropdown } from "react-bootstrap"
import { QuotationType } from "../../services/QuotationService"

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
    bill_item_datas: Array<BillItemType>

}

class BillItemTableClass extends BaseStateClass<StateType, PropType> {
    declare pendingChange: DebouncedFunc<any>
    handleListener(action: string, props: any) {
        let bill_item_datas = this.state.bill_item_datas || []
        switch (action) {
            case "SELECT_QUOTATION_MODAL_LISTENER":
                if (props.action == "SUBMIT") {
                    let quotation_data = props.return as QuotationType
                    bill_item_datas.push({
                        price: quotation_data.total,
                        qty: 1,
                        // tax_percent => not used
                        // tax_type => not used
                        tax_price: quotation_data.total_tax_price,
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

    handleDeleteBillItem(index: number) {
        let bill_item_datas = this.state.bill_item_datas || [];
        bill_item_datas.splice(index, 1);
        this.setState({
            bill_item_datas
        })
    }

    handleClickShowQuotationModal(e?: any) {
        this.setState({
            show_select_quotation_modal: true
        })
    }

    handleBillItemQtyChange(index: number, e: any) {
        let bill_item_datas = this.state.bill_item_datas || [];
        let bill_item = bill_item_datas[index];
        bill_item.qty = parseInt(e.target.value)
        bill_item_datas[index] = bill_item
        this.setState({
            bill_item_datas
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
    }

    render() {
        let bill_item_datas = this.state.bill_item_datas || []
        return <>
            <SelectQuotationModal
                project_id={this.props.project_id}
                show={this.state.show_select_quotation_modal}
                onListener={this.handleListener.bind(this, "SELECT_QUOTATION_MODAL_LISTENER")}></SelectQuotationModal>
            <div>
                <button className="btn btn-primary mb-3" onClick={this.handleClickShowQuotationModal.bind(this)}>Add</button>
            </div>
            <div className="card">
                <div className="table-responsive" style={{ "minHeight": "400px" }}>
                    <table className="table table-vcenter table-mobile-md card-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Tax Price</th>
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
                                        <div>{val.price}</div>
                                    </td>
                                    <td>
                                        <div style={{ width: "100px" }}>
                                            <input
                                                className="form-control"
                                                type="number"
                                                name="qty"
                                                value={val.qty}
                                                onChange={this.handleBillItemQtyChange.bind(this, i)}></input>

                                        </div>
                                    </td>

                                    <td data-lable="title">
                                        <div>{(val.price || 0) * (val.qty || 1)}</div>
                                    </td>
                                    <td data-label="Title">
                                        <div>{(val.tax_price || 0) * (val.qty || 1)}</div>
                                    </td>
                                    <td>
                                        <div className="btn-list flex-nowrap">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Action
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={this.handleDeleteBillItem.bind(this, i)}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
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
        bill_item_datas: props.value
    }), props);

    useEffect(() => {
        methods.setState({
            bill_item_datas: props.value
        })
    }, [props.value])

    return methods.render()
}