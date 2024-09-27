"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineCheck } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SignUpInput, signUpSchema } from "@/schemas/auth";
import ContinueBtn from "../continue-btn";
import { useMutation } from "@tanstack/react-query";
import { LoaderPinwheelIcon } from "lucide-react";
import { signUp } from "../actions";
import { toast } from "sonner";
import PasswordInput from "@/components/password-input";

const SignUpForm = () => {
  const [formData, setFormData] = React.useState<SignUpInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [focused, setFocused] = React.useState<string[]>([]);
  const [emailExist, setEmailExist] = React.useState<boolean>(false);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "email" && emailExist) setEmailExist(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isError = React.useCallback(
    (field?: "firstName" | "lastName" | "email" | "password" | undefined) => {
      const val = signUpSchema.safeParse(formData);
      if (val.success) return [];
      switch (field) {
        case "firstName":
          return val.error.issues.filter((err) =>
            err.path.includes("firstName")
          );
        case "lastName":
          return val.error.issues.filter((err) =>
            err.path.includes("lastName")
          );
        case "email":
          return val.error.issues.filter((err) => err.path.includes("email"));
        case "password":
          return val.error.issues.filter((err) =>
            err.path.includes("password")
          );
        default:
          return val.error.issues;
      }
    },
    [formData]
  );

  const handleOnChangFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (e.type == "blur" && !focused.includes(e.target.name)) {
      setFocused((prev) => [...prev, e.target.name]);
    }
  };

  const handleReset = (holdEmail?: boolean) => {
    setFormData((prev) => ({
      firstName: "",
      lastName: "",
      email: holdEmail ? prev.email : "",
      password: "",
    }));
    setFocused([]);
    setEmailExist(false);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: SignUpInput) => {
      return await signUp(input);
    },
    onSuccess({ success, message }) {
      if (success) {
        toast.success(message);
        handleReset();
      } else {
        handleReset(true);
        setEmailExist(true);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isError().length > 0 || emailExist) return;
    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg sm:border bg-card text-card-foreground shadow-sm p-4 sm:p-6 sm:mx-auto sm:max-w-md transition-all"
    >
      <div className="flex flex-col space-y-1.5">
        <h3 className="font-semibold tracking-tight text-2xl">Sign Up</h3>
        <p className="text-sm text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>

      <div className="pt-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                placeholder="Max"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleOnchange}
                className={cn(
                  "focus-visible:ring-0",
                  focused.includes("firstName") &&
                    isError("firstName").length > 0
                    ? "border-red-500"
                    : ""
                )}
                onBlur={handleOnChangFocus}
              />
              {focused.includes("firstName") &&
                isError("firstName").map((error, idx) => (
                  <p key={idx} className="text-red-500 text-xs font-bold">
                    {error.message}
                  </p>
                ))}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                placeholder="Robinson"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleOnchange}
                className={cn(
                  "focus-visible:ring-0",
                  focused.includes("lastName") && isError("lastName").length > 0
                    ? "border-red-500"
                    : ""
                )}
                onBlur={handleOnChangFocus}
              />
              {focused.includes("lastName") &&
                isError("lastName").map((error, idx) => (
                  <p key={idx} className="text-red-500 text-xs font-bold">
                    {error.message}
                  </p>
                ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="test@example.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleOnchange}
              className={cn(
                "focus-visible:ring-0",
                focused.includes("email") && isError("email").length > 0
                  ? "border-red-500"
                  : ""
              )}
              onBlur={handleOnChangFocus}
            />
            {focused.includes("email") &&
              isError("email").map((error, idx) => (
                <p key={idx} className="font-bold text-xs text-red-500">
                  {error.message}
                </p>
              ))}
            {emailExist && (
              <p className="font-bold text-xs text-red-500">
                This email is already in use.{" "}
                <Link
                  className="text-primary text-xs"
                  href={`/login${
                    formData.email == "" ? "" : "?email=" + formData.email
                  }`}
                >
                  Sign in
                </Link>
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>

            <PasswordInput
              placeholder="********"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleOnchange}
              onBlur={handleOnChangFocus}
              className={cn(
                focused.includes("password") && isError("password").length > 0
                  ? "border-red-500"
                  : ""
              )}
            />

            <div className="flex flex-col gap-y-1">
              <Label className="font-normal text-xs">
                Your password must include:
              </Label>
              <p
                className={cn(
                  "inline-flex gap-x-2 items-center text-gray-500",
                  isError("password").filter(
                    (err) => err.code == "too_small" || err.code == "too_big"
                  ).length > 0
                    ? ""
                    : "text-green-400"
                )}
              >
                <AiOutlineCheck size={16} />
                <span className="font-medium text-xs">8 to 40 characters</span>
              </p>
              <p
                className={cn(
                  "inline-flex gap-x-2 items-center text-gray-500",
                  isError("password").filter((err) => err.code == "custom")
                    .length > 0
                    ? ""
                    : "text-green-400"
                )}
              >
                <AiOutlineCheck size={16} />
                <span className="font-medium text-xs">
                  Letters, numbers and special characters
                </span>
              </p>
            </div>
          </div>
          <Button disabled={isPending} variant="default">
            {isPending && (
              <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
            )}
            Create an account
          </Button>
          <ContinueBtn label="Sign up with Google" redir="/signup" />
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
