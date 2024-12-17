import SetUrl from "../../components/helper/SetUrl"
import BaseService from "./BaseService"
import { MemberType } from "./MemberService"
import { PaymentType } from "./PaymentService"
import { ProjectType } from "./ProjectService"
import { QuotationType } from "./QuotationService"


export const BILL_OPTIONS = [
    {
        label : "One Time",
        value : "one_time"
    },
    {
        label : "Recurring",
        value : "recurring"
    },{
        label : "Debt",
        value : "debt"
    }
]

export const BILL_STATUS_PENDING = "pending"
export const BILL_STATUS_FINISH = "finish"
export const BILL_STATUS_CANCEL = "cancel"

export type BillType = {
    id?: string
    member_id?: string
    project_id?: string
    total_price?: number
    status?: string
    type?: "one_time" | "recurring" | "debt"

    created_at?: string
    updated_at?: string
    deleted_at?: string

    member?: MemberType
    project?: ProjectType
    payments?: Array<PaymentType>

    // Local
    bill_items?: Array<BillItemType>
}

export type BillItemType = {
    id?: string
    bill_id?: string
    quotation_id?: string
    price?: number
    tax_price?: number
    tax_percent?: number
    tax_type?: string
    qty?: number

    created_at?: string
    updated_at?: string
    deleted_at?: string

    bill?: BillType
    quotation?: QuotationType
}

export type BillQueryType = {

}

export default {
    async add(props: BillType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["bill.new"]).send(props);
            return resData.body;
        } catch (ex) {
            throw ex;
        }
    },
    async update(props: BillType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["bill.update"]).send(props);
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async gets(props: BillQueryType) {
        try {
            let resData = await BaseService.superagent.get(BaseService.URL["bill.bills"]).query(props || {});
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async getById(id: string) {
        try {
            let resData = await BaseService.superagent.get(SetUrl(BaseService.URL["bill.view"], [{ ":id": id }]))
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async delete(ids: Array<string>) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["bill.delete"]).send({
                ids: JSON.stringify(ids)
            })
            return resData.body
        } catch (error) {
            throw error
        }
    }
}