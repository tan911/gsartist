import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: "http://localhost:8080", // Your Express server URL,
	// fetchOptions: {
	// 	onRequest: (url, options) => {
	// 		console.log("Making request to:", url);
	// 		console.log("Options:", options);
	// 	},
	// },
	plugins: [
		inferAdditionalFields({
			user: {
				role: {
					type: "string",
					input: true,
				},
			},
		}),
	],
});
