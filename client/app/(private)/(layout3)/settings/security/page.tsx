"use client";
import React from "react";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import DeactivateBtn from "./deactivate-btn";
import MFASwitch from "./mfa-switch";
import { PasswordBtn } from "./password-btn";
import ProviderList from "./provider-list";

const SecurityPage = () => {
  const { currentUser } = useAuthContext();
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold">Email address</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            The email address association with your account.
          </p>
        </div>
        <div className="flex gap-4 items-center justify-between w-full">
          <div className="text-sm">
            <p>{currentUser?.email}</p>
            {!currentUser!.emailVerified ? (
              <div className="text-red-500">Unverified</div>
            ) : (
              <div className="text-green-500">Verified</div>
            )}
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
            Set a unique password to protect your account.
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
        <ProviderList oauthProviders={currentUser!.oauthProviders} />
      </div>
      <div className="flex w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold">Mutible-factor authentication (MFA)</p>
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
      </div>
    </>
  );
};

export default SecurityPage;
