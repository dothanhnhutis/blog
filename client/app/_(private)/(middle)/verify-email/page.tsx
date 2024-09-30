"use client";
import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ChangeEmailForm from "./change-email";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendEmailVerify } from "../actions";
import useCountDown from "@/hook/useCountDown";
import { LoaderPinwheelIcon } from "lucide-react";
import EmailSVG from "@/components/svg/email";

const VerifyEmailPage = () => {
  const { currentUser } = useAuthContext();
  const [time, setTime] = useCountDown("reSendEmail", currentUser?.email || "");
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      await sendEmailVerify();
    },

    onSuccess() {
      setTime();
      toast.success(
        "New verification email is successfully sent. Please, check your email..."
      );
    },
  });
  return (
    <div
      className="flex flex-col flex-grow sm:flex-grow-0 sm:grid grid-cols-12 transition-all
  "
    >
      <div className="flex flex-col flex-grow sm:flex-grow-0 sm:col-start-3 sm:col-end-11 mx-auto w-full sm:max-w-screen-sm p-4">
        <div className="flex flex-col flex-grow space-y-6">
          <div className="mt-10 mb-6 text-center">
            <div className="inline-flex w-[145px] h-[130px] min-w-[145px] min-h-[130px]">
              <EmailSVG />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
            <span>Verify your email to continue</span>
          </h1>
          <div className="text-center text-muted-foreground text-base">
            We just sent an email to the address:{" "}
            <strong className="block md:inline">{currentUser?.email}</strong>
          </div>
          <p className="text-center text-muted-foreground text-base">
            Please check your email and select the link provided to verify your
            address.
          </p>
          <div className="flex flex-col sm:justify-center sm:flex-row gap-2">
            <Link
              target="_blank"
              href="https://gmail.com/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-full order-last font-bold"
              )}
            >
              Go to Gmail Inbox
            </Link>
            <Button
              disabled={isPending || time > 0}
              onClick={() => mutate()}
              variant="outline"
              className="rounded-full border-2 border-primary !text-primary font-bold"
            >
              {isPending ? (
                <LoaderPinwheelIcon className="h-4 w-4 mr-2 animate-spin flex-shrink-0" />
              ) : time > 0 ? (
                `(${time}s)`
              ) : (
                <></>
              )}{" "}
              Send again
            </Button>
          </div>

          <ChangeEmailForm
            disabled={isPending}
            currentEmail={currentUser?.email!}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
