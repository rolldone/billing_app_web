import { useEffect, useMemo, useState } from "react"
import BaseStateClass from "../../../components/helper/BaseStateClass"
import { Button, Modal } from "react-bootstrap";
import QuotationService, { QuotationType } from "../../services/QuotationService";
import { debounce, DebouncedFunc } from "lodash-es";

export type PropType = {
    project_id: string
    show: boolean
    onListener: {
        (props: {
            action: string
            return: any
        }): void
    }
}

export type StateType = {
    form_query: any
    quotation_data: QuotationType
    quotation_datas: Array<QuotationType>

}

class SelectQuotationModalClass extends BaseStateClass<StateType, PropType> {

    declare pendingSearch: DebouncedFunc<any>

    async mounted() {
        this.setQuotations(await this.getQuotations())
    }

    handleClose(action?: string | null) {
        if (action == "SUBMIT") {
            return this.props.onListener({
                action: "SUBMIT",
                return: this.state.quotation_data
            })
        }
        this.props.onListener({
            action: "CLOSE",
            return: null
        })
    }

    async getQuotations() {
        try {
            let form_query = this.state.form_query
            form_query.project_id = this.props.project_id || 0
            let resData = await QuotationService.gets(form_query);
            return resData
        } catch (error) {
            console.error("getQuotations - err :: ", error);
        }
    }

    setQuotations(props: any) {
        if (props == null) return
        let _return = props.return;
        this.setState({
            quotation_datas: _return
        })
    }

    handleClickItem(props?: any, e?: any) {
        let quotation_datas = this.state.quotation_datas;
        this.setState({
            quotation_data: quotation_datas[props.index]
        })
    }

    handleChangeSearch(props: any, e?: any) {
        let form_query = this.state.form_query
        form_query = {
            ...form_query,
            [e.target.name]: e.target.value
        }
        this.setState({
            form_query
        })

        if (this.pendingSearch != null) {
            this.pendingSearch.cancel()
        }

        this.pendingSearch = debounce(() => {
            this.mounted()
        }, 1000);

        this.pendingSearch()
    }

    render() {
        let quotation_datas = this.state.quotation_datas || [];
        let quotation_data = this.state.quotation_data
        return <Modal show={this.props.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>Select Quotation Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label className="form-label">Search Quotation</label>
                    <input
                        type="text"
                        className="form-control"
                        name="search_text"
                        onChange={this.handleChangeSearch.bind(this, {})}
                        placeholder="Input placeholder"
                    />
                </div>
                <div className="mb-3">
                    <div className="list-group list-group-flush">
                        {quotation_datas.map((val, i) => {
                            return <div key={val.id} className={"list-group-item " + (quotation_data.id == val.id ? "active" : "")} onClick={this.handleClickItem.bind(this, {
                                id: val.id,
                                index: i
                            })}>
                                <div className="row align-items-center">
                                    {/* <div className="col-auto">
                                    <input type="checkbox" className="form-check-input" />
                                </div> */}
                                    <div className="col-auto">
                                        <div>
                                            <span
                                                className="avatar"
                                                style={{ backgroundImage: "url(./static/avatars/003f.jpg)" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block">
                                            {val.name}
                                        </a>
                                        <div className="d-block text-secondary text-truncate mt-n1">
                                            {val.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose.bind(this, null)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleClose.bind(this, "SUBMIT")}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    }
}

export default function SelectQuotationModal(props: PropType) {

    let methods = useMemo(() => new SelectQuotationModalClass(), []);

    methods.defineState(useState<StateType>({
        form_query: {},
        quotation_datas: [],
        quotation_data: {}
    }), props);

    useEffect(()=>{
        if(props.show == false) return
        methods.mounted()
    },[props.show])

    return methods.render()
}