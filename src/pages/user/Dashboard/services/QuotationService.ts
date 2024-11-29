import BaseService from "./BaseService";
import { ProjectType } from "./ProjectService";

export type QuotationType = {
    id?: string
    project_id?: string
    price?: number
    tax_percent?: number
    tax_type?: string
    items?: Array<any>

    // Relation
    project?: ProjectType

    created_at?: string
    updated_at?: string
    deleted_at?: string
}

export type QuotationQueryType = {

}

export default {
    async add(props: QuotationType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["project.new"]).send(props);
            return resData.body;
        } catch (ex) {
            throw ex;
        }
    },
    update(props: QuotationType) {

    },
    gets(props: QuotationQueryType) {

    },
    getById(id: string) {

    },
    deletes(ids: Array<string>) {

    }
}