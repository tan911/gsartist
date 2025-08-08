"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "../ui/button-old";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/inputLabel";
import { Label } from "../ui/label";
import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "@/lib/action";
import { LoadingSpinner } from "@/components/ui/data-loading";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    if (state === "Successful!") {
      router.push("/");
    }
  }, [state, router]);

  console.log(state, "result===================");

  return (
    <>
      <Card className="max-w-lg mx-auto w-full">
        {state && (
          <div className="bg-red-500 max-w-lg mx-auto w-full">{state}</div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Signup with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-6 lg:mb-10">
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Google
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                    <Input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                    <Input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your@email.com"
                    className="pl-8"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-8 pr-8"
                    placeholder="Create password"
                    required
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-0.5 text-gray-300 p-px bg-transparent cursor-pointer hover:bg-transparent hover:text-gray-700">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-inherit" />
                    ) : (
                      <Eye className="h-4 w-4 text-inherit" />
                    )}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                {isPending ? (
                  <LoadingSpinner size="sm" text="Creating account..." />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
          <div className="text-center text-sm lg:mt-5">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline underline-offset-4">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
