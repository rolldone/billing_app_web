import SetUrl from "../../components/helper/SetUrl"
import { UserType } from "../../services/AuthService"
import BaseService from "./BaseService"
import { QuotationType } from "./QuotationService"


export type MemberType = {
    id?: string
    name?: string
    email?: string
    status?: string
    address?: string
    phone_number?: string
    user_id?: string
    member_user_id?: string

    created_at?: string
    updated_at?: string
    deleted_at?: string

    user?: UserType
    member_user?: UserType
}

export type MemberItemType = {
    id?: string
    member_id?: string
    quotation_id?: string
    price?: number
    tax_price?: number
    tax_percent?: number
    tax_type?: string
    qty?: number

    created_at?: string
    updated_at?: string
    deleted_at?: string

    member?: MemberType
    quotation?: QuotationType
}

export type MemberQueryType = {

}

export default {
    async add(props: MemberType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["member.new"]).send(props);
            return resData.body;
        } catch (ex) {
            throw ex;
        }
    },
    async update(props: MemberType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["member.update"]).send(props);
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async gets(props: MemberQueryType) {
        try {
            let resData = await BaseService.superagent.get(BaseService.URL["member.members"]).query(props || {});
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async getById(id: string) {
        try {
            let resData = await BaseService.superagent.get(SetUrl(BaseService.URL["member.view"], [{ ":id": id }]))
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async delete(ids: Array<string>) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["member.delete"]).send({
                ids: JSON.stringify(ids)
            })
            return resData.body
        } catch (error) {
            throw error
        }
    }
}