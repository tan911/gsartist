import { createAuthClient } from 'better-auth/client'
import { inferAdditionalFields } from 'better-auth/client/plugins'

// Extended user type to include backend-specific fields
export interface ExtendedUser {
    id: string // better-auth session ID
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date
    updatedAt: Date
    role: string
    artistId: string // Artist table ID (for artists only)
}

export const authClient = createAuthClient({
    baseURL: 'http://localhost:8080', // Your Express server URL,
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
                    type: 'string',
                    input: true,
                },
                artistId: {
                    type: 'string',
                    input: false, // This is returned by backend, not input
                },
            },
        }),
    ],
})
