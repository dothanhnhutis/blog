import React from "react";
import { SignInForm } from "./form";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const LoginPage = ({
  searchParams,
}: {
  searchParams: {
    email: string;
  };
}) => {
  return (
    <SignInForm
      email={searchParams.email}
      oauth_error={cookies().get("oauth_error")?.value}
    />
  );
};

export default LoginPage;
