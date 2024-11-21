import BaseService from "./BaseService"

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
}

export type RecoverPasswordType = {
  password?: string
  password_confirmation ?: string
  code ?: string
}

export type RegisterConfirmationCodeType = {
  code ?: string
}

export default {
  async login(props: AuthType) {
    try {
      let resData = await BaseService.superagent.post(BaseService.URL["auth.login"]).send(props);
      return resData.body;
    } catch (ex) {
      throw ex;
    }
  },
  async register(props: UserType) {
    try {
      let resData = await BaseService.superagent.post(BaseService.URL["auth.register"]).send(props);
      return resData.body;
    } catch (ex) {
      throw ex;
    }
  },
  async registerConfirmCode(props:RegisterConfirmationCodeType){
    try {
      let resData = await BaseService.superagent.post(BaseService.URL["auth.register_confirm_code"]).send(props);
      return resData.body;
    } catch (ex) {
      throw ex;
    }
  },
  async forgotPassword(email: string) {
    try {
      let resData = await BaseService.superagent.post(BaseService.URL["auth.forgot_password"]).send({
        email
      });
      return resData.body;
    } catch (ex) {
      throw ex;
    }
  },
  async recoverPassword(props: RecoverPasswordType) {
    try {
      let resData = await BaseService.superagent.post(BaseService.URL["auth.recover_password"]).send(props);
      return resData.body;
    } catch (ex) {
      throw ex;
    }
  },
  async profile() {
    try {
      let resData = await BaseService.superagent.get(BaseService.URL["auth.profile"]).query({});
      return resData.body;
    } catch (ex) {
      throw ex;
    }
  },
  async updateProfile(props: any) {
    try {
      let resData = await BaseService.superagent.post(BaseService.URL["auth.profile.update"]).send(props);
      return resData;
    } catch (ex) {
      throw ex;
    }
  },
  async logout() {
    try {
      let tokensArr: string | Array<string> = window.localStorage.getItem("token") || "";
      tokensArr = tokensArr.split("|");
      let resData = await BaseService.superagent.get(BaseService.URL["auth.logout"]).query({
        token_id: tokensArr[0]
      });
      return resData.body;
    } catch (ex) {
      throw ex;
    }
  },
}