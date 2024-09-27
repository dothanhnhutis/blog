"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AiOutlineCheck, LoaderPinwheelIcon } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { ResetPasswordInput, resetPasswordSchema } from "@/schemas/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPassword } from "../actions";
import PasswordInput from "../../../components/password-input";
import { useMutation } from "@tanstack/react-query";

const ResetPasswordForm = ({ session }: { session: string }) => {
  const router = useRouter();
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);

  const [formData, setFormData] = React.useState<ResetPasswordInput>({
    session,
    password: "",
    confirmPassword: "",
  });

  const isError = React.useCallback(
    (field?: "password" | "confirmPassword" | undefined) => {
      const val = resetPasswordSchema.safeParse(formData);
      if (val.success) return [];
      switch (field) {
        case "password":
          return val.error.issues.filter((err) =>
            err.path.includes("password")
          );
        case "confirmPassword":
          return val.error.issues.filter((err) =>
            err.path.includes("confirmPassword")
          );
        default:
          return val.error.issues;
      }
    },
    [formData]
  );

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [focused, setFocused] = React.useState<string[]>([]);

  const handleOnChangFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (e.type == "blur" && !focused.includes(e.target.name)) {
      setFocused((prev) => [...prev, e.target.name]);
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: ResetPasswordInput) => {
      return await resetPassword(input);
    },
    onSuccess({ success, message }) {
      if (success) {
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
        toast.success(message);
        router.push("/login");
      } else {
        toast.error(message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isError().length > 0) return;
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
      <div className="flex flex-col gap-y-1.5">
        <Label htmlFor="new-password">New password</Label>
        <PasswordInput
          id="new-password"
          name="password"
          autoComplete="off"
          placeholder="********"
          value={formData.password}
          onChange={handleOnchange}
          onBlur={handleOnChangFocus}
          disabled={isPending}
          open={isHiddenPassword}
          onOpenChange={() => setIsHiddenPassword((prev) => !prev)}
        />

        <div className="flex flex-col gap-y-1">
          <p className="font-normal text-xs">Your password must include:</p>
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
              isError("password").filter((err) => err.code == "custom").length >
                0
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
      <div className="flex flex-col gap-y-1.5">
        <Label htmlFor="confirm-password">Confirm password</Label>

        <PasswordInput
          id="confirm-password"
          name="confirmPassword"
          autoComplete="off"
          placeholder="********"
          value={formData.confirmPassword}
          onChange={handleOnchange}
          onBlur={handleOnChangFocus}
          disabled={isPending}
          open={isHiddenPassword}
          onOpenChange={() => setIsHiddenPassword((prev) => !prev)}
        />

        {focused.includes("confirmPassword") &&
          isError("confirmPassword").map((error, idx) => (
            <p key={idx} className="font-bold text-xs text-red-500">
              {error.message}
            </p>
          ))}
      </div>
      <Button disabled={isPending}>
        {isPending && (
          <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
        )}
        Reset
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
