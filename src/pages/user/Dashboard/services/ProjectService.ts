import SetUrl from "../../components/helper/SetUrl"
import BaseService from "./BaseService"

export type ProjectType = {
    id?: string
    name?: string
    description?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string
    type?: "installment" | "product" | "project"
}

export type ProjectQueryType = {
    id?: string
    row?: number
    page?: number
    search?: string
}

export default {
    async add(props: ProjectType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["project.new"]).send(props);
            return resData.body;
        } catch (ex) {
            throw ex;
        }
    },
    async update(props: ProjectType) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["project.update"]).send(props);
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async gets(props?: ProjectQueryType) {
        try {
            let resData = await BaseService.superagent.get(BaseService.URL["project.projects"]).query(props || {});
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async getById(id: string) {
        try {
            let resData = await BaseService.superagent.get(SetUrl(BaseService.URL["project.view"], [{ ":id": id }]))
            return resData.body
        } catch (error) {
            throw error
        }
    },
    async delete(ids: Array<string>) {
        try {
            let resData = await BaseService.superagent.post(BaseService.URL["project.delete"]).send({
                ids: JSON.stringify(ids)
            })
            return resData.body
        } catch (error) {
            throw error
        }
    }
}