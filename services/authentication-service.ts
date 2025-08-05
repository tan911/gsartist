import type { PrismaClient, User } from "@repo/db";
import type { HashPassword } from "@/lib/password";
import { signInSchema } from "@/lib/schema";
import { type Logger } from "@repo/shared";

interface IAuthService {
	signup: (data: { email: string; password: string }) => Promise<User | void>;
}

type AuthServiceAdapters = {
	prisma: PrismaClient;
	hashPassword: HashPassword;
	logger: Logger;
};

export class AuthenticationService implements IAuthService {
	constructor(private readonly adapters: AuthServiceAdapters) {}

	public async signup(data: { email: string; password: string }) {
		const validationResult = signInSchema.safeParse(data);

		if (!validationResult.success) {
			this.adapters.logger.error("VALIDATION ERRROR:", validationResult.error);
			throw new Error("VALIDATION ERROR!", { cause: validationResult.error });
		}

		const { email, password } = validationResult.data;

		const existingUser = await this.adapters.prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (existingUser) {
			this.adapters.logger.error("EMAIL DUPLICATION ERROR");
			throw new Error("Email already registered");
		}

		try {
			const userPsswrdHashed = this.adapters.hashPassword(password);

			const user = await this.adapters.prisma.user.create({
				data: {
					email: email,
					password: userPsswrdHashed,
				},
			});

			return user;
		} catch (error) {
			console.log("CATCH!", error);
		}
	}
}
