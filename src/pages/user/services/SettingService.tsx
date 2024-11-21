import BaseService from "./BaseService"

export type SettingType = {
    // id?: string
    // name?: string
    // user_id?: string
    // description?: string
    // value?: string
    // created_at?: string
    // updated_at?: string
    logo?: any
    logo_string?: string
    office_name?: string
    timezone?: string
    address?: string
    phone_number?: string
    city?: string
    province?: string
    country?: string
    last_installer_at?: string
}


export default {
    async view() {
        try {
            let resData = await BaseService.superagent.get(BaseService.URL["setting.setting"])
            return resData.body;
        } catch (error) {
            throw error;
        }
    },
    async submit(props: SettingType) {
        try {
            delete props.logo_string
            let _props = props as any
            let httpRequest = BaseService.superagent.post(BaseService.URL["setting.update"])
            for (var key in _props) {
                if (key == "logo") {
                    httpRequest.attach(key, _props[key])
                } else {
                    httpRequest.field(key, _props[key])
                }
            }
            let resData = await httpRequest
            return resData.body;
        } catch (error) {
            throw error
        }
    }
}