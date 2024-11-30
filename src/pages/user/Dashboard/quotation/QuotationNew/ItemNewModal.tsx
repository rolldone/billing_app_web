import { useEffect, useMemo, useState } from "react";
import BaseStateClass from "../../../components/helper/BaseStateClass";
import { Button, Modal } from "react-bootstrap";
import { ItemType } from "../../services/QuotationService";

export type StateType = {
    form_data: ItemType
}

export type PropType = {
    show: boolean
    edit_data?: ItemType
    onListener: {
        (props: {
            action: string
            return?: ItemType | null
        }): void
    }
}

export class ItemNewModalClass extends BaseStateClass<StateType, PropType> {
    handleClose() {
        this.props.onListener({
            action: "CLOSE",
            return: null
        })
    }
    totalAndTaxNominal(price: number, qty: number, tax: number, tax_type: "include" | "exclude") {
        let tax_price = 0;
        let total = price * qty
        if (tax_type == "exclude") {
            tax_price = price * (tax / 100)
            tax_price = tax_price * qty
            total = price * qty;
            total = total + tax_price
            return [parseFloat(total.toFixed(2)), parseFloat(tax_price.toFixed(2))]
        }
        let tax_factor = 1 + (tax / 100)
        let priceBeforeTax = total / tax_factor
        tax_price = total - priceBeforeTax
        return [parseFloat(total.toFixed(2)), parseFloat(tax_price.toFixed(2))]
    }
    submitNew(isClose: boolean) {
        let form_data = this.state.form_data
        let [total, tax_price] = this.totalAndTaxNominal(form_data.price, form_data.qty, form_data.tax_percent, form_data.tax_type)
        form_data.total = total
        form_data.tax_price = tax_price
        if (isClose == false) {
            this.props.onListener({
                action: "NEW",
                return: this.state.form_data
            })
        } else {
            this.props.onListener({
                action: "CLOSE",
                return: this.state.form_data
            })
        }
        this.setState({
            form_data: {
                name: "",
                price: 0,
                item_description: "",
                qty: 0,
                total: 0,
                tax_percent: 10,
                tax_type: "include"
            }
        })
    }
    handleFormDataChange(props: any, e: any) {
        let form_data = this.state.form_data
        switch (e.target.name) {
            case "tax_type":
                form_data = {
                    ...form_data,
                    [e.target.name]: e.target.checked == true ? "exclude" : "include"
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
    render() {
        let form_data = this.state.form_data
        return <>
            <Modal show={this.props.show} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label required">Item Name</label>
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
                        <label className="form-label required">Item Description</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="item_description"
                                onChange={this.handleFormDataChange.bind(this, {})}
                                value={form_data.item_description || ""}
                            />
                            <small className="form-hint">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Price</label>
                        <div>
                            <input
                                type="number"
                                className="form-control"
                                placeholder=""
                                name="price"
                                onChange={this.handleFormDataChange.bind(this, {})}
                                value={form_data.price || ""}
                            />
                            <small className="form-hint">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Qty</label>
                        <div>
                            <input
                                type="number"
                                className="form-control"
                                placeholder=""
                                name="qty"
                                onChange={this.handleFormDataChange.bind(this, {})}
                                value={form_data.qty || ""}
                            />
                            <small className="form-hint">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Tax Percent</label>
                        <div>
                            <input
                                type="number"
                                className="form-control"
                                placeholder=""
                                name="tax_percent"
                                onChange={this.handleFormDataChange.bind(this, {})}
                                value={form_data.tax_percent || ""}
                            />
                            <small className="form-hint">
                                Your password must be 8-20 characters long, contain letters and
                                numbers, and must not contain spaces, special characters, or emoji.
                            </small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div>
                            <label className="form-check">
                                <input
                                    name="tax_type"
                                    onChange={this.handleFormDataChange.bind(this, {})}
                                    checked={form_data.tax_type == "exclude"}
                                    className="form-check-input"
                                    type="checkbox" />
                                <span className="form-check-label">Tax Exlcude</span>
                            </label>
                        </div>
                        <small className="form-hint">
                            Your password must be 8-20 characters long, contain letters and
                            numbers, and must not contain spaces, special characters, or emoji.
                        </small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={this.submitNew.bind(this, true)}>
                        Save
                    </Button>
                    <Button
                        variant="primary"
                        onClick={this.submitNew.bind(this, false)}>
                        Save And New
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    }
}

export default function ItemNewModal(props: PropType) {
    let methods = useMemo(() => new ItemNewModalClass(), []);

    methods.defineState(useState<StateType>({
        form_data: {
            name: "",
            price: 0,
            item_description: "",
            qty: 0,
            total: 0,
            tax_percent: 10,
            tax_type: "include"
        }
    }), props);

    useEffect(() => {
        if (props.edit_data == null) return;
        methods.setState({
            form_data: props.edit_data
        })
    }, [props.edit_data])

    return methods.render()
}