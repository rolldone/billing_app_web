import { useMemo, useState } from "react";
import BaseStateClass from "./components/helper/BaseStateClass";
import AuthService, { RecoverPasswordType } from "./services/AuthService";
import { useSearchParams } from "react-router-dom";

export type StateType = {
	form_data: RecoverPasswordType
}

export type PropType = {

}

export class RecoverPasswordClass extends BaseStateClass<StateType, PropType> {

	handleFormChange(props: any, e?: any) {
		let form_data = this.state.form_data || {}
		switch (e.target.name) {
			case 'term_police_status':
				form_data = {
					...form_data,
					[e.target.name]: e.target.checked
				}
				break;
			default:
				form_data = {
					...form_data,
					[e.target.name]: e.target.value
				}
				break;
		}
		this.setState({
			form_data
		})
	}

	async submit() {
		try {
			let form_data = this.state.form_data
			let resData = await AuthService.recoverPassword(form_data)
			alert("success")
			window.location.replace("/user/login")
		} catch (error) {
			console.error("submit - err :: ", error)
		}
	}
}

export default function RecoverPassword(props: any) {
	const [searchParams, setSearchParams] = useSearchParams();
	let methods = useMemo(() => new RecoverPasswordClass(), []);

	methods.defineState(useState<StateType>({
		form_data: {
			password: "",
			password_confirmation: "",
			code: searchParams.get("code") || ""
		}
	}), props);

	return <div className="page page-center">
		<div className="container container-tight py-4">
			<div className="text-center mb-4">
				<a href="." className="navbar-brand navbar-brand-autodark">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={110}
						height={32}
						viewBox="0 0 232 68"
						className="navbar-brand-image"
					>
						<path
							d="M64.6 16.2C63 9.9 58.1 5 51.8 3.4 40 1.5 28 1.5 16.2 3.4 9.9 5 5 9.9 3.4 16.2 1.5 28 1.5 40 3.4 51.8 5 58.1 9.9 63 16.2 64.6c11.8 1.9 23.8 1.9 35.6 0C58.1 63 63 58.1 64.6 51.8c1.9-11.8 1.9-23.8 0-35.6zM33.3 36.3c-2.8 4.4-6.6 8.2-11.1 11-1.5.9-3.3.9-4.8.1s-2.4-2.3-2.5-4c0-1.7.9-3.3 2.4-4.1 2.3-1.4 4.4-3.2 6.1-5.3-1.8-2.1-3.8-3.8-6.1-5.3-2.3-1.3-3-4.2-1.7-6.4s4.3-2.9 6.5-1.6c4.5 2.8 8.2 6.5 11.1 10.9 1 1.4 1 3.3.1 4.7zM49.2 46H37.8c-2.1 0-3.8-1-3.8-3s1.7-3 3.8-3h11.4c2.1 0 3.8 1 3.8 3s-1.7 3-3.8 3z"
							fill="#066fd1"
							style={{ fill: "var(--tblr-primary, #066fd1)" }}
						/>
						<path
							d="M105.8 46.1c.4 0 .9.2 1.2.6s.6 1 .6 1.7c0 .9-.5 1.6-1.4 2.2s-2 .9-3.2.9c-2 0-3.7-.4-5-1.3s-2-2.6-2-5.4V31.6h-2.2c-.8 0-1.4-.3-1.9-.8s-.9-1.1-.9-1.9c0-.7.3-1.4.8-1.8s1.2-.7 1.9-.7h2.2v-3.1c0-.8.3-1.5.8-2.1s1.3-.8 2.1-.8 1.5.3 2 .8.8 1.3.8 2.1v3.1h3.4c.8 0 1.4.3 1.9.8s.8 1.2.8 1.9-.3 1.4-.8 1.8-1.2.7-1.9.7h-3.4v13c0 .7.2 1.2.5 1.5s.8.5 1.4.5c.3 0 .6-.1 1.1-.2.5-.2.8-.3 1.2-.3zm28-20.7c.8 0 1.5.3 2.1.8.5.5.8 1.2.8 2.1v20.3c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2-.8-.8-1.2-.8-2.1c-.8.9-1.9 1.7-3.2 2.4-1.3.7-2.8 1-4.3 1-2.2 0-4.2-.6-6-1.7-1.8-1.1-3.2-2.7-4.2-4.7s-1.6-4.3-1.6-6.9c0-2.6.5-4.9 1.5-6.9s2.4-3.6 4.2-4.8c1.8-1.1 3.7-1.7 5.9-1.7 1.5 0 3 .3 4.3.8 1.3.6 2.5 1.3 3.4 2.1 0-.8.3-1.5.8-2.1.5-.5 1.2-.7 2-.7zm-9.7 21.3c2.1 0 3.8-.8 5.1-2.3s2-3.4 2-5.7-.7-4.2-2-5.8c-1.3-1.5-3-2.3-5.1-2.3-2 0-3.7.8-5 2.3-1.3 1.5-2 3.5-2 5.8s.6 4.2 1.9 5.7 3 2.3 5.1 2.3zm32.1-21.3c2.2 0 4.2.6 6 1.7 1.8 1.1 3.2 2.7 4.2 4.7s1.6 4.3 1.6 6.9-.5 4.9-1.5 6.9-2.4 3.6-4.2 4.8c-1.8 1.1-3.7 1.7-5.9 1.7-1.5 0-3-.3-4.3-.9s-2.5-1.4-3.4-2.3v.3c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2.1-.8c-.5-.5-.8-1.2-.8-2.1V18.9c0-.8.3-1.5.8-2.1.5-.6 1.2-.8 2.1-.8s1.5.3 2.1.8c.5.6.8 1.3.8 2.1v10c.8-1 1.8-1.8 3.2-2.5 1.3-.7 2.8-1 4.3-1zm-.7 21.3c2 0 3.7-.8 5-2.3s2-3.5 2-5.8-.6-4.2-1.9-5.7-3-2.3-5.1-2.3-3.8.8-5.1 2.3-2 3.4-2 5.7.7 4.2 2 5.8c1.3 1.6 3 2.3 5.1 2.3zm23.6 1.9c0 .8-.3 1.5-.8 2.1s-1.3.8-2.1.8-1.5-.3-2-.8-.8-1.3-.8-2.1V18.9c0-.8.3-1.5.8-2.1s1.3-.8 2.1-.8 1.5.3 2 .8.8 1.3.8 2.1v29.7zm29.3-10.5c0 .8-.3 1.4-.9 1.9-.6.5-1.2.7-2 .7h-15.8c.4 1.9 1.3 3.4 2.6 4.4 1.4 1.1 2.9 1.6 4.7 1.6 1.3 0 2.3-.1 3.1-.4.7-.2 1.3-.5 1.8-.8.4-.3.7-.5.9-.6.6-.3 1.1-.4 1.6-.4.7 0 1.2.2 1.7.7s.7 1 .7 1.7c0 .9-.4 1.6-1.3 2.4-.9.7-2.1 1.4-3.6 1.9s-3 .8-4.6.8c-2.7 0-5-.6-7-1.7s-3.5-2.7-4.6-4.6-1.6-4.2-1.6-6.6c0-2.8.6-5.2 1.7-7.2s2.7-3.7 4.6-4.8 3.9-1.7 6-1.7 4.1.6 6 1.7 3.4 2.7 4.5 4.7c.9 1.9 1.5 4.1 1.5 6.3zm-12.2-7.5c-3.7 0-5.9 1.7-6.6 5.2h12.6v-.3c-.1-1.3-.8-2.5-2-3.5s-2.5-1.4-4-1.4zm30.3-5.2c1 0 1.8.3 2.4.8.7.5 1 1.2 1 1.9 0 1-.3 1.7-.8 2.2-.5.5-1.1.8-1.8.7-.5 0-1-.1-1.6-.3-.2-.1-.4-.1-.6-.2-.4-.1-.7-.1-1.1-.1-.8 0-1.6.3-2.4.8s-1.4 1.3-1.9 2.3-.7 2.3-.7 3.7v11.4c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2.1-.8c-.5-.6-.8-1.3-.8-2.1V28.8c0-.8.3-1.5.8-2.1.5-.6 1.2-.8 2.1-.8s1.5.3 2.1.8c.5.6.8 1.3.8 2.1v.6c.7-1.3 1.8-2.3 3.2-3 1.3-.7 2.8-1 4.3-1z"
							fillRule="evenodd"
							clipRule="evenodd"
							fill="#4a4a4a"
						/>
					</svg>
				</a>
			</div>
			<div
				className="card card-md"
			>
				<div className="card-body">
					<h2 className="card-title text-center mb-4">Recover Password</h2>
					<div className="mb-3">
						<label className="form-label">Password</label>
						<div className="input-group input-group-flat">
							<input
								type="password"
								name="password"
								value={methods.state.form_data.password}
								onChange={methods.handleFormChange.bind(methods, {})}
								className="form-control"
								placeholder="Password"
								autoComplete="off"
							/>
							<span className="input-group-text">
								<a
									href="#"
									className="link-secondary"
									data-bs-toggle="tooltip"
									aria-label="Show password"
									data-bs-original-title="Show password"
								>
									{/* Download SVG icon from http://tabler-icons.io/i/eye */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
										className="icon"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
										<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
									</svg>
								</a>
							</span>
						</div>
					</div>
					<div className="mb-3">
						<label className="form-label">Password Confirmation</label>
						<div className="input-group input-group-flat">
							<input
								type="password"
								className="form-control"
								placeholder="Password Confirmation"
								name="password_confirmation"
								value={methods.state.form_data.password_confirmation}
								onChange={methods.handleFormChange.bind(methods, {})}
								autoComplete="off"
							/>
							<span className="input-group-text">
								<a
									href="#"
									className="link-secondary"
									data-bs-toggle="tooltip"
									aria-label="Show password"
									data-bs-original-title="Show password"
								>
									{/* Download SVG icon from http://tabler-icons.io/i/eye */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
										className="icon"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
										<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
									</svg>
								</a>
							</span>
						</div>
					</div>
					<div className="form-footer">
						<button type="submit" className="btn btn-primary w-100" onClick={methods.submit.bind(methods)}>
							Recover Password
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

}