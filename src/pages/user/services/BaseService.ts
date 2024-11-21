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
		"auth.profile": BASE_API_URL + "/api/user/auth/profile",
		"auth.profile.update": BASE_API_URL + "/api/user/auth/profile",
		"auth.login": BASE_API_URL + "/api/user/auth/login",
		"auth.register": BASE_API_URL + "/api/user/auth/register",
		"auth.forgot_password": BASE_API_URL + "/api/user/auth/forgot_password",
		"auth.recover_password": BASE_API_URL +
			"/api/user/auth/recovery_password",
		"auth.register_confirm_code": BASE_API_URL +
			"/api/user/auth/register_confirm_code",
		"auth.logout": BASE_API_URL + "/api/user/auth/logout",

		// User Setting
		"setting.update": BASE_API_URL + "/api/user/setting",
		"setting.setting": BASE_API_URL + "/api/user/setting",
	},
};
