"use client";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { LoaderPinwheelIcon, OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInInput } from "@/schemas/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ContinueBtn from "../continue-btn";
import PasswordInput from "../../../components/password-input";
import { useMutation } from "@tanstack/react-query";
import { clearEmailRegistered, reActivateAccount, signIn } from "../actions";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const SignInForm = ({
  registered,
  email,
}: {
  registered?: string;
  email?: string;
}) => {
  const [accountSuspended, setAccountSuspended] =
    React.useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = React.useState<SignInInput>({
    email: registered || email || "",
    password: "",
    mfa_code: "",
  });

  const [openMFACode, setOpenMFACode] = React.useState<boolean>(false);

  const [error, setError] = React.useState<{
    success: boolean;
    message: string;
  }>({
    success: true,
    message: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      success: true,
      message: "",
    });
    if (e.target.name == "email") setAccountSuspended(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = (holdEmail?: boolean) => {
    setFormData((prev) => ({
      email: holdEmail ? prev.email : "",
      password: "",
      mfa_code: "",
    }));
    setAccountSuspended(false);
    setError({ success: true, message: "" });
    setOpenMFACode(false);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: SignInInput) => {
      return await signIn(
        openMFACode ? input : { email: input.email, password: input.password }
      );
    },
    onSuccess({ success, data }) {
      if (!success) {
        if (data.message == "Your account is currently closed") {
          handleReset(true);
          setAccountSuspended(true);
        } else if (data.message == "MFA code is required") {
          setOpenMFACode(true);
        } else {
          handleReset();
          setError({ success: false, message: data.message });
        }
      } else {
        router.push(DEFAULT_LOGIN_REDIRECT);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email == "" || formData.password == "") return;
    if (
      !z.string().email().safeParse(formData.email).success ||
      formData.password.length < 8 ||
      formData.password.length > 40
    )
      setError({ success: false, message: "Invalid email or password." });
    mutate(formData);
  };

  const handleReActivate = async () => {
    await reActivateAccount(formData.email);
    handleReset();
  };

  const registeredRef = React.useRef<boolean>(!!registered || false);

  React.useEffect(() => {
    const handleClearEmailRegistered = async () => {
      await clearEmailRegistered();
    };
    handleClearEmailRegistered();
  }, []);

  return (
    <>
      {accountSuspended && (
        <div className="flex items-center gap-3 rounded-lg bg-amber-200 text-orange-500 sm:rounded-xl sm:max-w-md mx-4 sm:mx-auto transition-all mt-4 mb-10 p-4 ">
          <OctagonAlertIcon className="size-6  flex flex-shrink-0" />
          <p className="text-sm ">
            Your account is currently closed. If you would like to reactivate
            your account, click{" "}
            <button onClick={handleReActivate} className="underline">
              here
            </button>
            .
          </p>
        </div>
      )}
      {registeredRef.current && (
        <div className="flex items-center gap-3 rounded-lg bg-amber-200 text-orange-500 sm:rounded-xl sm:max-w-md mx-4 sm:mx-auto transition-all mt-4 mb-10 p-4 ">
          <OctagonAlertIcon className="size-6  flex flex-shrink-0" />
          <p className="text-sm ">
            We've found an existing ICH account with this email address. Please
            continue to login with your account email and password below.
          </p>
        </div>
      )}
      {!openMFACode ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg sm:border bg-card text-card-foreground sm:shadow-sm p-4 sm:p-6 sm:mx-auto sm:max-w-md transition-all"
        >
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold tracking-tight text-2xl">Login</h3>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <div className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="test@example.com"
                  onChange={handleOnchange}
                  value={formData.email}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href={`/recover${
                      formData.email == "" ? "" : "?email=" + formData.email
                    }`}
                    className="ml-auto inline-block text-sm underline "
                  >
                    Forgot your password?
                  </Link>
                </div>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="********"
                  autoComplete="off"
                  onChange={handleOnchange}
                  value={formData.password}
                />

                {!error.success && (
                  <p className="text-red-500 text-xs font-bold">
                    {error.message}
                  </p>
                )}
              </div>

              <Button disabled={isPending} variant="default">
                {!openMFACode && isPending && (
                  <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
                )}
                Login
              </Button>
              <ContinueBtn label="Login with Google" redir="/login" />
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link className="underline" href="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg sm:border bg-card text-card-foreground sm:shadow-sm p-4 sm:p-6 sm:mx-auto sm:max-w-md transition-all"
        >
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold tracking-tight text-2xl">
              Multi-factor authentication
            </h3>
            <p className="text-sm text-muted-foreground">
              Your account is secured using multi-factor authentication (MFA).
              To finish signing in, turn on or view your MFA device and type the
              authentication code below.
            </p>
          </div>
          <div className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="mfa_code">MFA code</Label>
                  <Link
                    href={"#"}
                    className="ml-auto inline-block text-sm underline "
                  >
                    Troubleshoot MFA
                  </Link>
                </div>
                <Input
                  id="mfa_code"
                  name="mfa_code"
                  placeholder="MFA code"
                  onChange={handleOnchange}
                  value={formData.mfa_code}
                />
              </div>

              <Button disabled={isPending} variant="default">
                {openMFACode && isPending && (
                  <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
                )}
                Submit
              </Button>
              <Button variant="outline" onClick={() => handleReset()}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
