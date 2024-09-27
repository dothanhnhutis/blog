"use server";
import { ResetPasswordInput, SignInInput, SignUpInput } from "@/schemas/auth";
import userApi from "@/service/collections/user-collections";
import authApi from "@/service/collections/auth.collection";
import { cookies, headers } from "next/headers";
import { cookieParser } from "@/lib/cookies-parser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookieServer } from "../actions";

export async function signUp(input: SignUpInput) {
  const { success, data } = await authApi.signUp(input);
  return { success, message: data.message };
}

export async function signIn(input: SignInInput) {
  const ua = headers().get("x-user-agent") || "";
  const ip = headers().get("x-forwarded-for") || "";
  const res = await authApi.signIn(input, {
    headers: {
      "user-agent": ua,
      "x-forwarded-for": ip,
    },
  });
  if (res.success) {
    cookies().delete("registered");
    for (const cookie of res.headers.getSetCookie()) {
      const parser = cookieParser(cookie);
      if (parser) {
        const { name, value, ...opt } = parser;
        cookies().set(name, value, opt);
      }
    }
  }
  return res;
}

export async function sendEmailVerify() {
  await userApi.sendEmailVerify(await cookieServer());
}

export async function verifyEmail(token: string) {
  await authApi.verifyEmail(token);
  revalidatePath("/confirm-email");
  revalidatePath("/verify-email");
}

export async function reActivateAccount(email: string) {
  await authApi.reActivateAccount(email);
  cookies().set("send-email", "true");
  redirect("/send-email");
}

export async function clearSendEmail() {
  cookies().delete("send-email");
}

export async function resetPassword(input: ResetPasswordInput) {
  const { success, data } = await authApi.resetPassword(input);
  return { success, message: data.message };
}

export async function activateAccount(token: string) {
  await authApi.activateAccount(token);
}

export async function clearEmailRegistered() {
  cookies().delete("registered");
}
