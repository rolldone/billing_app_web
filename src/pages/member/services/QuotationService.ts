import SetUrl from "../../components/helper/SetUrl";
import BaseService from "./BaseService";
import { ProjectType } from "./ProjectService";

export type QuotationType = {
    id?: string
    project_id?: string
    name?: string
    total?: number
    total_tax_price?: number
    description?: string
    items?: Array<ItemType>

    // Relation
    project?: ProjectType

    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export type ItemType = {
    name: string
    item_description: string
    price: number
    qty: number
    tax_type: "include" | "exclude"
    tax_percent: number

    // Local
    tax_price?: number
    total: number
    index?: number

}

export type QuotationQueryType = {

}

export default {
    async add(props: QuotationType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["quotation.new"]).send(props);
            return resData.body;
        } catch (ex) {
            throw ex;
        }
    },
    async update(props: QuotationType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["quotation.update"]).send(props);
            return resData.body;
        } catch (error) {
            throw error
        }
    },
    async gets(props: QuotationQueryType) {
        try {
            let resData = await BaseService.superagent.get(BaseService.URL["quotation.quotations"]).query(props);
            return resData.body;
        } catch (error) {
            throw error
        }
    },
    async getById(id: string) {
        try {
            let resData = await BaseService.superagent.get(SetUrl(BaseService.URL["quotation.view"], [{ ":id": id }]))
            return resData.body
        } catch (error) {
            throw error
        }
    },
    deletes(ids: Array<string>) {

    }
}