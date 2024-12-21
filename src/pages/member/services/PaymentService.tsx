import SetUrl from "../../components/helper/SetUrl"
import BaseService from "./BaseService"
import { BillType } from "./BillService"

export type PaymentType = {
    id?: string
    bill_id?: string
    date?: string
    status?: "pending" | "finish" | "cancel"
    type?: "payment_gateway" | "manual"
    amount?: number
    payment_from?: string
    payment_dest_id?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
    attach_file?: string

    // Relation
    bill?: BillType

    // Local
    new_remaining?: number
    remaining?: number

}

export type PaymentQueryType = {
    id?: string
    row?: number
    page?: number
    search?: string
}

export default {
    async add(props: PaymentType) {
        try {
            let httpRequest = BaseService.superagent.post(BaseService.URL["payment.new"])
            let _props = props as any
            for (var key in _props) {
                if (key == "attach_file") {
                    if (_props[key] instanceof Blob) {
                        httpRequest.attach(key, _props[key])
                    }
                } else {
                    httpRequest.field(key, _props[key])
                }
            }
            let resData = await httpRequest
            return resData.body;
        } catch (ex) {
            throw ex;
        }
    },
    async update(props: PaymentType) {
        try {
            let httpRequest = BaseService.superagent.post(BaseService.URL["payment.update"])
            let _props = props as any
            for (var key in _props) {
                if (_props[key] == undefined) {
                    continue
                }
                if (key == "attach_file") {
                    if (_props[key] instanceof Blob) {
                        httpRequest.attach(key, _props[key])
                    }
                } else {
                    httpRequest.field(key, _props[key])
                }
            }
            let resData = await httpRequest
            return resData.body;
        } catch (error) {
            throw error
        }
    },
    async delete(ids: Array<string>) {
        try {
            let httpRequest = BaseService.superagent.post(BaseService.URL["payment.delete"]).send({
                ids: ids
            })
            let resData = await httpRequest
            return resData.body;
        } catch (error) {
            throw error
        }
    },
    async gets(props?: PaymentQueryType) {
        try {
            let resData = await BaseService.superagent.get(BaseService.URL["payment.payments"]).query(props || {});
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async getById(id: string) {
        try {
            let resData = await BaseService.superagent.get(SetUrl(BaseService.URL["payment.view"], [{ ":id": id }]))
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async validate(id: string) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["payment.validate"]).send({
                id
            })
            return resData.body
        } catch (error) {
            throw error
        }
    }
}