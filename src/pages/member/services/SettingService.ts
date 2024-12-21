import { UserType } from "./UserService"

export type SettingArrType = {
    created_at?: string
    description?: string
    id?: string
    name?: string
    updated_at?: string
    user_id?: string
    value?: string

    // Relation
    user?: UserType
}

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
