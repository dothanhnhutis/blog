"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { LoaderPinwheelIcon, LockIcon, XIcon } from "lucide-react";
import { AiOutlineCheck } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  createPasswordSchema,
  EditPasswordInput,
  editPasswordSchema,
} from "@/schemas/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createPassword, editPassword } from "../actions";
import { omit } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/components/providers/auth-provider";
import PasswordInput from "@/components/password-input";

export const PasswordBtn = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);
  const [invalidCurrentPassword, setInvalidCurrentPassword] =
    React.useState<boolean>(false);
  const [newPasswordError, setNewPasswordError] =
    React.useState<boolean>(false);

  const [formData, setFormData] = React.useState<EditPasswordInput>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const isError = React.useCallback(
    (
      field?: "oldPassword" | "newPassword" | "confirmNewPassword" | undefined
    ) => {
      const val = currentUser!.hasPassword
        ? editPasswordSchema.safeParse(formData)
        : createPasswordSchema.safeParse(omit(formData, ["oldPassword"]));
      if (val.success) return [];
      switch (field) {
        case "oldPassword":
          return currentUser!.hasPassword
            ? val.error.issues.filter((err) => err.path.includes("oldPassword"))
            : [];
        case "newPassword":
          return val.error.issues.filter((err) =>
            err.path.includes("newPassword")
          );
        case "confirmNewPassword":
          return val.error.issues.filter((err) =>
            err.path.includes("confirmNewPassword")
          );
        default:
          return val.error.issues;
      }
    },
    [formData]
  );
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "oldPassword" && invalidCurrentPassword)
      setInvalidCurrentPassword(false);
    if (e.target.name == "newPassword" && newPasswordError)
      setNewPasswordError(false);
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
    mutationFn: async (input: EditPasswordInput) => {
      return currentUser?.hasPassword
        ? await editPassword(input)
        : await createPassword(omit(input, ["oldPassword"]));
    },
    onSuccess({ success, message }) {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
        toast.success(message);
        setOpenDialog(false);
      } else {
        toast.error(message);
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setFocused([]);
        if (message == "Old password is incorrect")
          setInvalidCurrentPassword(true);
        if (message == "The new password and old password must not be the same")
          setNewPasswordError(true);
      }
    },
  });

  const handleReset = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setFocused([]);
    setIsHiddenPassword(true);
    setInvalidCurrentPassword(false);
    setNewPasswordError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isError().length > 0) return;
    mutate(formData);
  };

  React.useEffect(() => {
    handleReset();
  }, [openDialog]);

  return (
    <Dialog
      defaultOpen={true}
      open={openDialog}
      onOpenChange={(open) => {
        if (!isPending) setOpenDialog(open);
      }}
    >
      <Button
        onClick={() => {
          setOpenDialog(true);
        }}
        className="rounded-full "
        variant="outline"
      >
        {currentUser?.hasPassword ? "Change password" : "Set password"}
      </Button>

      <DialogContent className="sm:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>
            {currentUser?.hasPassword ? "Update password" : "Create password"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {currentUser!.hasPassword && (
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Current password</Label>
              <PasswordInput
                disabled={isPending}
                id="oldPassword"
                name="oldPassword"
                autoComplete="off"
                spellCheck="false"
                placeholder="********"
                value={formData.oldPassword}
                onChange={handleOnchange}
                onBlur={handleOnChangFocus}
                open={isHiddenPassword}
                onOpenChange={setIsHiddenPassword}
              />
              {focused.includes("oldPassword") &&
                isError("oldPassword").map((error, idx) => (
                  <p key={idx} className="text-red-500 text-xs font-bold">
                    {error.message}
                  </p>
                ))}

              {invalidCurrentPassword && (
                <p className="text-red-500 text-xs font-bold">
                  Current password is incorrect.
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="newPassword">New password</Label>
            <PasswordInput
              disabled={isPending}
              id="newPassword"
              name="newPassword"
              autoComplete="off"
              spellCheck="false"
              placeholder="********"
              value={formData.newPassword}
              onChange={handleOnchange}
              onBlur={handleOnChangFocus}
              open={isHiddenPassword}
              onOpenChange={setIsHiddenPassword}
            />

            <div className="flex flex-col gap-y-1">
              <p className="font-normal text-xs">Your password must include:</p>
              <p
                className={cn(
                  "inline-flex gap-x-2 items-center text-gray-500",
                  isError("newPassword").filter(
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
                  isError("newPassword").filter((err) => err.code == "custom")
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
              {newPasswordError && (
                <p className="text-red-500 text-xs font-bold flex gap-2 items-center">
                  <XIcon className="size-4 flex flex-shrink-0" />
                  <span>
                    The new password and old password must not be the same
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm password</Label>
            <PasswordInput
              disabled={isPending}
              id="confirmNewPassword"
              name="confirmNewPassword"
              autoComplete="off"
              spellCheck="false"
              placeholder="********"
              value={formData.confirmNewPassword}
              onChange={handleOnchange}
              onBlur={handleOnChangFocus}
              open={isHiddenPassword}
              onOpenChange={setIsHiddenPassword}
            />

            {focused.includes("confirmNewPassword") &&
              isError("confirmNewPassword").map((error, idx) => (
                <p key={idx} className="text-red-500 text-xs font-bold">
                  {error.message}
                </p>
              ))}
          </div>
          <div className="flex gap-4 flex-col sm:flex-row justify-end">
            <Button disabled={isPending} className="sm:order-last">
              {isPending && (
                <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2 " />
              )}
              Save
            </Button>
            <Button
              type="button"
              onClick={() => {
                setOpenDialog(false);
              }}
              disabled={isPending}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
