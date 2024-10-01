"use server";
import userApi from "@/service/collections/user-collections";
import { cookies } from "next/headers";

export async function sendEmailVerify() {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  await userApi.sendEmailVerify(allCookie);
}

export async function changeEmail(email: string) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { data, success } = await userApi.changeEmail(allCookie, {
    email,
  });
  return { message: data.message, success };
}
