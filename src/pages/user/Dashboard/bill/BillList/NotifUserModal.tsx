import { useEffect, useMemo, useState } from "react";
import BaseStateClass from "../../../components/helper/BaseStateClass";
import { Button, Modal } from "react-bootstrap";
import { BillType } from "../../services/BillService";

type PropType = {
    show: boolean
    bill_data: BillType
    onListener: { (props: any): void }
}

type StateType = {
    bill_data: BillType
}

class NotifUserModalClass extends BaseStateClass<StateType, PropType> {

    handleClose(isSubmit?: boolean) {
        if (isSubmit == true) {
            // this.validateBill()
            return
        }
        this.props.onListener({
            action: "CLOSE",
            return: null
        })
    }

    render() {
        let bill_data = this.state.bill_data
        return <Modal show={this.props.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="card">
                    <div className="table-responsive">
                        <table className="table table-vcenter card-table">
                            <thead>
                                <tr>
                                    <th>Share</th>
                                    <th className="w-1" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{bill_data.member?.email}</td>
                                    <td>
                                        <div className="btn-list flex-nowrap">
                                            <a href="#" className="btn">
                                                Send
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href={"/member/bill/" + bill_data.id} target="_blank">
                                        Link
                                        </a>
                                    </td>
                                    <td>
                                        <div className="btn-list flex-nowrap">
                                            <a href="#" className="btn">
                                                Copy
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose.bind(this, false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    }
}

export default function NotifUserModal(props: PropType) {

    let methods = useMemo(() => new NotifUserModalClass(), []);

    methods.defineState(useState<StateType>({
        bill_data: {},
    }), props);

    useEffect(() => {
        if (props.show == false) return
        methods.setState({
            bill_data: props.bill_data
        })
        console.log("props.bill_data :: ", props.bill_data)
    }, [props.show])

    return methods.render()
}