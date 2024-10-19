"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { SignInWithMFAInput } from "@/schemas/auth";
import { isFetchApiError } from "@/service/fetch-api";
import http from "@/service/http";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type MFAFormProps = {
  sessionId: string;
  btnBack?: () => void;
};

const MFAForm = ({ sessionId, btnBack }: MFAFormProps) => {
  const router = useRouter();
  const [code, setCode] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      return (
        await http.post<{ message: string }, SignInWithMFAInput>(
          "/auth/signin/mfa",
          {
            sessionId,
            code,
          }
        )
      ).data;
    },

    onMutate() {
      setCode("");
      setError("");
      console.log("onSettled");
    },
    onSuccess() {
      router.push(DEFAULT_LOGIN_REDIRECT);
    },
    onError(error) {
      console.log("onError");
      if (isFetchApiError(error)) {
        console.log(error.response?.data.message);
        setError(error.response?.data.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.length != 6) {
      setError("Mã MFA không hợp lệ");
      setCode("");
    } else {
      mutate();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg sm:border bg-card text-card-foreground sm:shadow-sm p-4 sm:p-6 sm:mx-auto sm:max-w-md transition-all"
    >
      <div className="flex flex-col space-y-1.5">
        <h3 className="font-semibold tracking-tight text-2xl">
          Multi-factor authentication
        </h3>
        <p className="text-sm text-muted-foreground">
          Your account is secured using multi-factor authentication (MFA). To
          finish signing in, turn on or view your MFA device and type the
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
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              value={code}
            />
            {error.length > 0 && (
              <p className="text-red-500 text-xs font-bold">{error}</p>
            )}
          </div>

          <Button disabled={isPending} variant="default">
            {isPending && (
              <LoaderCircleIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
            )}
            Submit
          </Button>
          <Button variant="outline" onClick={btnBack}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MFAForm;
