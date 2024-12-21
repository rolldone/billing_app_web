import SetUrl from "../../components/helper/SetUrl"
import BaseService from "./BaseService"

export type PaymentDestType = {
    id?: string
    name?: string
    description?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
    payment_type?: string
    data_info?: any
}

export type PaypalDataInfoType = {
    address?: string
}

export type BankTransferDataInfoType = {
    bank_name?: string
    account_name?: string
    account_number?: string
    branch_code?: string
    swift_code?: string
}

export type MidtransDataInfoType = {
    merchant_code?: string
}

export type CashDataInfoType = {
    cash_name?: string
}

export type PaymentDestQueryType = {
    id?: string
    payment_type?: string
    row?: number
    page?: number
    search?: string
}

export default {
    async add(props: PaymentDestType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["payment_dest.new"]).send(props);
            return resData.body;
        } catch (ex) {
            throw ex;
        }
    },
    async update(props: PaymentDestType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["payment_dest.update"]).send(props);
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async gets(props?: PaymentDestQueryType) {
        try {
            let resData = await BaseService.superagent.get(BaseService.URL["payment_dest.payment_dests"]).query(props || {});
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async getById(id: string) {
        try {
            let resData = await BaseService.superagent.get(SetUrl(BaseService.URL["payment_dest.view"], [{ ":id": id }]))
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async delete(ids: Array<string>) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["payment_dest.delete"]).send({
                ids: JSON.stringify(ids)
            })
            return resData.body
        } catch (error) {
            throw error
        }
    }
}