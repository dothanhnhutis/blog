"use client";
import Link from "next/link";
import { toast } from "sonner";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { recover } from "@/app/actions";
import { useMutation } from "@tanstack/react-query";
import { LoaderPinwheelIcon } from "lucide-react";

const RecoverForm = (props: { email?: string }) => {
  const [email, setEmail] = useState(() => props.email || "");

  const { isPending, mutate } = useMutation({
    mutationFn: async (email: string) => await recover(email),
    onSuccess(data) {
      setEmail("");
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email == "") return;
    mutate(email);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="example@gmail.com"
          className="focus-visible:ring-offset-0 focus-visible:ring-transparent"
        />
      </div>
      <div className="flex justify-end items-center mt-4">
        <Link href="/login" className={buttonVariants({ variant: "link" })}>
          Cancel
        </Link>

        <Button disabled={isPending} variant="default">
          {isPending && (
            <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
          )}
          Send Email
        </Button>
      </div>
    </form>
  );
};

export default RecoverForm;
