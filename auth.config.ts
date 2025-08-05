// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { hashPassword } from "@/lib/password";
// import { AuthenticationService } from "@/services/authentication-service";
// // import { prisma } from "@repo/db";
// // import { logger } from "@/lib/logger";
// // import { PrismaAdapter } from "@auth/prisma-adapter";
// // NOTE:
// // DELETE unnecessary pacakges
// // zod tranfer to share packages.
// // apply file rotation on logs

// import type { NextAuthResult } from "next-auth";

// const nextAuthResult = NextAuth({
// 	// adapter: PrismaAdapter(prisma),
// 	providers: [
// 		Credentials({
// 			credentials: {
// 				email: {},
// 				password: {},
// 			},
// 			authorize: async (credentials) => {
// 				const { prisma } = await import("@repo/db");
// 				const { logger } = await import("@/lib/logger");
// 				const service = new AuthenticationService({
// 					prisma,
// 					hashPassword,
// 					logger,
// 				});

// 				const user = await service.signup(
// 					credentials as { email: string; password: string }
// 				);

// 				if (!user) {
// 					return null;
// 				}

// 				return user;
// 			},
// 		}),
// 	],
// });

// export const handlers = nextAuthResult.handlers;
// export const signIn: NextAuthResult["signIn"] = nextAuthResult.signIn;
// export const signOut: NextAuthResult["signOut"] = nextAuthResult.signOut;
// export const auth: NextAuthResult["auth"] = nextAuthResult.auth;
