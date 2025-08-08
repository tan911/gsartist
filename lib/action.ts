"use server";

import { BetterAuthError } from "better-auth";
import { authClient } from "./auth";
import { error } from "better-auth/api";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const { data, error } = await authClient.signUp.email({
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      role: "artist",
    });

    console.log(error, data, "-------------------");

    if (error) {
      // return {
      // 	success: false,
      // 	message: error.message || "Registration failed",
      // 	status: error.status || "error",
      // };
      return error.message || "Registration failed";
    }

    return "Successful!";
  } catch (error) {
    console.error("Authentication error:", error);

    if (error instanceof Error) {
      return error.message;
    }

    return "Authetication failed!";

    // return {
    // 	success: false,
    // 	message:
    // 		error instanceof Error ? error.message : "An unexpected error occurred",
    // 	status: "error",
    // };
  }
}

export async function login(prevState: string | undefined, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
    });

    console.log(error, data, "-------------------");

    if (error) {
      // return {
      // 	success: false,
      // 	message: error.message || "Registration failed",
      // 	status: error.status || "error",
      // };
      return error.message || "Registration failed";
    }

    return "Successful!";
  } catch (error) {
    console.error("Authentication error:", error);

    if (error instanceof Error) {
      return error.message;
    }

    return "Authetication failed!";
  }
}
