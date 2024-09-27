import React from "react";
import { verifyEmail } from "../actions";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
const ConfirmEmailPage = async ({
  searchParams,
}: {
  searchParams: {
    token: string;
  };
}) => {
  await verifyEmail(searchParams.token);
  return <div>ConfirmEmail</div>;
};

export default ConfirmEmailPage;
