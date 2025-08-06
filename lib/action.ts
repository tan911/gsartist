"use server";

import axios, { AxiosError } from "axios";

// import { signIn } from "@/auth.config";
// import { AuthError } from "next-auth";

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		const email = formData.get("email");
		const password = formData.get("password");

		// TODO: validate

		// request to send data
		const response = await axios.post(
			"http://localhost:8080/auth/sign-up/email",
			{
				name: "Jovan Lanutan",
				role: "artist",
				email: email,
				password: password,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		console.log(response, "=================");

		return response;

		// await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				message: error.message,
				status: error.status,
			};
		}

		throw error;
	}
}
