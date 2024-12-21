import request from "superagent";
import { toast, ToastContainer } from "react-toastify";

const BASE_API_URL = import.meta.env.VITE_PUBLIC_MASTER_DATA_API;
const superagent = request.agent();
superagent.set(
    "Authorization",
    "Bearer " + window.localStorage.getItem("token") || "",
);

// Add error handler to handle 401 responses
superagent.on("error", (err: any) => {
    if (err.status === 403) {
        // Handle 401 error
        console.log("Unauthorized!");
        toast.error("Unauthorized!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
                window.location.replace(`/user/auth/logout`);
            },
        });
    } else {
        // Handle other errors
        console.error(err);
    }
});

export default {
    superagent,
    URL: {
        // User Auth
        "project.projects": BASE_API_URL + "/api/member/project/projects",
        "project.new": BASE_API_URL + "/api/member/project/add",
        "project.view": BASE_API_URL + "/api/member/project/:id",
        "project.update": BASE_API_URL + "/api/member/project/update",
        "project.delete": BASE_API_URL + "/api/member/project/delete",

        "quotation.new": BASE_API_URL + "/api/member/quotation/add",
        "quotation.update": BASE_API_URL + "/api/member/quotation/update",
        "quotation.quotations": BASE_API_URL + "/api/member/quotation/quotations",
        "quotation.view": BASE_API_URL + "/api/member/quotation/:id",
        "quotation.delete": BASE_API_URL + "/api/member/quotation/delete",

        "bill.new": BASE_API_URL + "/api/member/bill/add",
        "bill.update": BASE_API_URL + "/api/member/bill/update",
        "bill.bills": BASE_API_URL + "/api/member/bill/bills",
        "bill.view": BASE_API_URL + "/api/member/bill/:id",
        "bill.delete": BASE_API_URL + "/api/member/bill/delete",

        "member.new": BASE_API_URL + "/api/member/member/add",
        "member.update": BASE_API_URL + "/api/member/member/update",
        "member.members": BASE_API_URL + "/api/member/member/members",
        "member.view": BASE_API_URL + "/api/member/member/:id",
        "member.delete": BASE_API_URL + "/api/member/member/delete",

        "payment.payments": BASE_API_URL + "/api/member/payment/payments",
        "payment.new": BASE_API_URL + "/api/member/payment/add",
        "payment.view": BASE_API_URL + "/api/member/payment/:id",
        "payment.update": BASE_API_URL + "/api/member/payment/update",
        "payment.delete": BASE_API_URL + "/api/member/payment/delete",
        "payment.validate": BASE_API_URL + "/api/member/payment/validate",

        "payment_dest.payment_dests": BASE_API_URL + "/api/member/payment_dest/payment_dests",
        "payment_dest.new": BASE_API_URL + "/api/member/payment_dest/add",
        "payment_dest.view": BASE_API_URL + "/api/member/payment_dest/:id",
        "payment_dest.update": BASE_API_URL + "/api/member/payment_dest/update",
        "payment_dest.delete": BASE_API_URL + "/api/member/payment_dest/delete",
    },
};
