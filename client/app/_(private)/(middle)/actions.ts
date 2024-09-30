"use server";
import userApi from "@/service/collections/user-collections";
import { cookieServer } from "@/app/actions";

export async function sendEmailVerify() {
  console.log(await cookieServer());
  await userApi.sendEmailVerify(await cookieServer());
}

export async function changeEmail(email: string) {
  const { data, success } = await userApi.changeEmail(await cookieServer(), {
    email,
  });
  return { message: data.message, success };
}
