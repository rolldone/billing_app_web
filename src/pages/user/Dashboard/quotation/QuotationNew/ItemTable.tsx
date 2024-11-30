import { useEffect, useMemo, useState } from "react";
import BaseStateClass from "../../../components/helper/BaseStateClass";
import { ItemType, QuotationType } from "../../services/QuotationService";
import ItemNewModal from "./ItemNewModal";

export type StateType = {
    item_datas: Array<ItemType>
    item_new_modal_show: boolean
    select_item_data?: ItemType
}

export type PropType = {
    name: string
    value: Array<ItemType>
    onChange: {
        (e: {
            target: {
                name: string
                value: Array<ItemType>
            }
        }): void
    }
}

export class ItemTableClass extends BaseStateClass<StateType, PropType> {
    handleClick(action: string, props: any, e?: any) {
        let item_datas = this.state.item_datas || [];
        switch (action) {
            case "EDIT":
                item_datas[props.index].index = props.index;
                this.setState({
                    select_item_data: item_datas[props.index]
                })
                setTimeout(() => {
                    this.showNewItemModal()
                }, 500);
                break;
            case "DELETE":
                item_datas = item_datas.splice(1, props.index);
                this.setState({
                    item_datas
                })
                break;
        }
    }
    showNewItemModal() {
        this.setState({
            item_new_modal_show: !this.state.item_new_modal_show
        })
    }
    handleListener(action: any, props: any) {
        switch (action) {
            case "ITEM_NEW_MODAL_LISTENER":
                let items = this.state.item_datas
                let item_datas = items || [];
                switch (props.action) {
                    case "CLOSE":
                        this.setState({
                            item_new_modal_show: !this.state.item_new_modal_show
                        })
                        if (props.return == null) {
                            return
                        }
                        break;
                }
                let _return = props.return as ItemType
                if (_return.index != null) {
                    item_datas[_return.index] = _return
                } else {
                    item_datas.push(_return)
                }
                this.props.onChange({
                    target: {
                        name: this.props.name,
                        value: item_datas
                    }
                })
                break;
        }
    }
    render() {
        let item_datas = this.state.item_datas || [];
        return <>
            <div className="w-100">
                <button
                    onClick={this.showNewItemModal.bind(this)}
                    className="btn btn-primary mb-3">New Item</button>
            </div>
            <div className="card">

                <ItemNewModal
                    edit_data={this.state.select_item_data}
                    onListener={this.handleListener.bind(this, "ITEM_NEW_MODAL_LISTENER")}
                    show={this.state.item_new_modal_show}></ItemNewModal>
                <div className="table-responsive">
                    <table className="table table-vcenter card-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Tax</th>
                                <th>Total</th>
                                <th className="w-1" />
                            </tr>
                        </thead>
                        <tbody>
                            {item_datas.map((val, i) => {
                                return <tr key={JSON.stringify(val)}>
                                    <td>
                                        <div className="d-flex py-1 align-items-center">
                                            {/* <span
                        className="avatar me-2"
                        style={{ backgroundImage: "url(./static/avatars/006m.jpg)" }}
                    /> */}
                                            <div className="flex-fill">
                                                <div className="font-weight-medium">{val.name}</div>
                                                <div className="text-secondary">
                                                    <a href="#" className="text-reset">
                                                        {val.item_description}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{val.price}</div>
                                        <div className="text-secondary"></div>
                                    </td>
                                    <td className="text-secondary">{val.qty}</td>
                                    <td className="text-secondary">
                                        <div className="flex-fill">
                                            <div className="font-weight-medium">{val.tax_price}</div>
                                            <div className="text-secondary">
                                                <a href="#" className="text-reset">
                                                    ({val.tax_percent}%) {val.tax_type}
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{val.total}</td>
                                    <td>
                                        <div className="btn-list flex-nowrap">
                                            <a
                                                onClick={this.handleClick.bind(this, "DELETE", { index: i })}
                                                href="#"
                                                className="btn">
                                                Delete
                                            </a>
                                            <a
                                                onClick={this.handleClick.bind(this, "EDIT", { index: i })}
                                                href="#"
                                                className="btn">
                                                Edit
                                            </a>

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

export default function ItemTable(props: PropType) {

    let methods = useMemo(() => new ItemTableClass(), []);

    methods.defineState(useState<StateType>({
        item_datas: props.value,
        item_new_modal_show: false,
    }), props);

    useEffect(() => {
        methods.setState({
            item_datas: props.value
        })
    }, [props.value])

    return methods.render()
}