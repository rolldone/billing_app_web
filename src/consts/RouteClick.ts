const BASE_PATH = import.meta.env.VITE_PUBLIC_BASE_PATH;

let DEFINE_ROUTE_MAP = {
  "user.login": "user/login",
  "user.register": "user/register",
  "user.register.confirmation": "user/register/confirmation",
  "user.recovery_password": "user/recovery-password",
  "user.setup": "user/setup",
  "user.project.list": "user/project",
  "user.project.new": "user/project/new",
  "user.project.view": "user/project/:id",
  "user.quotation": "user/quotation",
  "user.quotation.new": "user/quotation/new",
  "user.quotation.view": "user/quotation/:id",
  "user.bill.list": "user/bill",
  "user.bill.new": "user/bill/new",
  "user.bill.view": "user/bill/:id",
  "user.order": "user/order",
  "user.order.new": "user/order/new",
  "user.order.view": "user/order/:id",
  "user.member": "user/member",
  "user.member.new": "user/member/new",
  "user.member.view": "user/member/:id"
}

const _route = DEFINE_ROUTE_MAP as any
for (let key in _route as {
  [key: string]: string
}) {
  _route[key] = BASE_PATH + "/" + (_route[key as any] as any)
}

const ROUTE_CLICK = _route as typeof DEFINE_ROUTE_MAP

export default ROUTE_CLICK
