"use server";

import { SignInInput } from "@/schemas/auth";
import { http, ErrorResponse, ResponseData } from "./http";
import { headers } from "next/headers";

export async function signin(input: SignInInput) {
  try {
    const ua = headers().get("x-user-agent") || "";
    const ip = headers().get("x-forwarded-for") || "";
    const res = await http.post<{ message: string; mfa: boolean }>(
      "/signin",
      input,
      {
        headers: {
          "user-agent": ua,
          "x-forwarded-for": ip,
        },
      }
    );
    return res;
  } catch (error: any) {
    return;
    if (error instanceof ErrorResponse) {
      return error.serialize();
    } else {
      console.log("signin() method error: ", error.message);
      return {
        headers: {},
        data: {
          message: "Email hoặc mật khẩu không hợp lệ.",
        },
        statusCode: 400,
      };
    }
  }
}
