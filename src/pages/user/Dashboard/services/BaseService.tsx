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
        "project.projects": BASE_API_URL + "/api/project/projects",
        "project.new": BASE_API_URL + "/api/project/add",
        "project.view": BASE_API_URL + "/api/project/:id",
        "project.update": BASE_API_URL + "/api/project/update",
        "project.delete": BASE_API_URL + "/api/project/delete",

        "quotation.new": BASE_API_URL + "/api/quotation/add",
        "quotation.update": BASE_API_URL + "/api/quotation/update",
        "quotation.quotations": BASE_API_URL + "/api/quotation/quotations",
        "quotation.view": BASE_API_URL + "/api/quotation/:id",
        "quotation.delete": BASE_API_URL + "/api/quotation/delete",

        "bill.new": BASE_API_URL + "/api/bill/add",
        "bill.update": BASE_API_URL + "/api/bill/update",
        "bill.bills": BASE_API_URL + "/api/bill/bills",
        "bill.view": BASE_API_URL + "/api/bill/:id",
        "bill.delete": BASE_API_URL + "/api/bill/delete",

        "member.new": BASE_API_URL + "/api/member/add",
        "member.update": BASE_API_URL + "/api/member/update",
        "member.members": BASE_API_URL + "/api/member/members",
        "member.view": BASE_API_URL + "/api/member/:id",
        "member.delete": BASE_API_URL + "/api/member/delete"
    },
};
