import { SettingArrType } from "./SettingService"

export type AuthType = {
    id?: number
    email?: string
    password?: string
}

export type UserType = AuthType & {
    password_confirmation?: string
    term_police_status?: boolean
    name?: string
    created_at?: string
    updated_at?: string
    deleted_at?: string

    // Relation
    settings?: Array<SettingArrType>
}

export type RecoverPasswordType = {
    password?: string
    password_confirmation?: string
    code?: string
}

export type RegisterConfirmationCodeType = {
    code?: string
}