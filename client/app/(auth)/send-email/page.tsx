import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
import Send from "./send";

const SendEmail = async () => {
  if (cookies().get("send-email")) return <Send />;
  else {
    return notFound();
  }
};

export default SendEmail;
