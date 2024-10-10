"use client";
import React from "react";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import DeactivateBtn from "./deactivate-btn";
import MFASwitch from "./mfa-switch";
import { PasswordBtn } from "./password-btn";
import ProviderList from "./provider-list";
import { Trash2Icon } from "lucide-react";

const SecurityPage = () => {
  const { currentUser } = useAuthContext();

  return (
    <div className="w-full p-2">
      <h3 className="text-3xl font-bold">Security</h3>
      <p className="text-xs font-normal leading-snug text-muted-foreground">
        Set up the settings below to protect your account
      </p>
      <div className="flex flex-col lg:flex-row w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold">Email address</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            The email address association with your account.
          </p>
        </div>
        <div className="flex gap-4 items-center justify-between w-full">
          <div className="text-sm">
            <p className="font-medium">gaconght@gmail.com</p>
            <div className="text-green-500">Verified</div>
          </div>
          <Button className="rounded-full" variant="outline">
            Change
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold">Password</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Set a highly secure password to protect your account.
          </p>
        </div>

        <PasswordBtn />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold">Connected accounts</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Another way to log in to your account.
          </p>
        </div>
        <ProviderList
          oauthProviders={[
            { id: "123123", provider: "google", providerId: "Asdasd" },
            { id: "123123", provider: "facebook", providerId: "Asdasd" },
          ]}
        />
      </div>
      <div className="flex w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold after:content-['*'] after:text-red-500">
            Mutible-factor authentication (MFA)
          </p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Make your account extra secure. Along with your password, you'll
            need to enter a code
          </p>
        </div>

        <MFASwitch />
      </div>
      <div className="flex w-full gap-4 py-4">
        <div className="w-full">
          <p className="font-bold">Deactivate my account</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            This will shut down your account. Your account will be reactive when
            you sign in again.
          </p>
        </div>

        <DeactivateBtn />
        <button>
          <Trash2Icon className="text-red-500 shrink-0 size-5" />
        </button>
      </div>
    </div>
  );
};

export default SecurityPage;
