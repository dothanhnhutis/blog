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
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focused, setFocused] = React.useState<string[]>([]);
  const [emailExist, setEmailExist] = React.useState<boolean>(false);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "email" && emailExist) setEmailExist(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isError = React.useCallback(
    (field?: "confirmPassword" | "email" | "password" | undefined) => {
      const val = signUpSchema.safeParse(formData);
      if (val.success) return [];
      switch (field) {
        case "confirmPassword":
          return val.error.issues.filter((err) =>
            err.path.includes("confirmPassword")
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
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);

  const handleReset = (holdEmail?: boolean) => {
    setFormData((prev) => ({
      email: holdEmail ? prev.email : "",
      password: "",
      confirmPassword: "",
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
        <h3 className="font-semibold tracking-tight text-2xl">Đăng ký</h3>
        <p className="text-sm text-muted-foreground">
          Nhập email và mật khẩu để tạo tài khoản
        </p>
      </div>

      <div className="pt-6">
        <div className="grid gap-4">
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
            <Label htmlFor="password">Mật khẩu</Label>

            <PasswordInput
              placeholder="********"
              id="password"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleOnchange}
              onBlur={handleOnChangFocus}
              className={cn(
                focused.includes("password") && isError("password").length > 0
                  ? "border-red-500"
                  : ""
              )}
              open={isHiddenPassword}
              onOpenChange={() => setIsHiddenPassword((prev) => !prev)}
            />

            <div className="flex flex-col gap-y-1">
              <Label className="font-normal text-xs">
                Mật khẩu của bạn phải bao gồm:
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
                <span className="font-medium text-xs">8 đến 40 ký tự</span>
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
                  Chữ cái, số và ký tự đặc biệt [@$!%*?&]
                </span>
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <PasswordInput
              placeholder="********"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              value={formData.confirmPassword}
              onChange={handleOnchange}
              onBlur={handleOnChangFocus}
              className={cn(
                focused.includes("confirmPassword") &&
                  isError("confirmPassword").length > 0
                  ? "border-red-500"
                  : ""
              )}
              open={isHiddenPassword}
              onOpenChange={setIsHiddenPassword}
            />
            {focused.includes("confirmPassword") &&
              isError("confirmPassword").map((error, idx) => (
                <p key={idx} className="font-bold text-xs text-red-500">
                  {error.message}
                </p>
              ))}
          </div>
          <Button disabled={isPending} variant="default">
            {isPending && (
              <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
            )}
            Đăng ký
          </Button>
          <ContinueBtn label="Đăng ký với Google" redir="/signup" />
        </div>
        <div className="mt-4 text-center text-sm">
          Bạn đã có tài khoản?{" "}
          <Link className="underline" href="/login">
            Đăng nhập
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
