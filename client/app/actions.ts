"use server";
import { cookies } from "next/headers";
import userApi from "@/service/collections/user-collections";
import authApi from "@/service/collections/auth.collection";
import { revalidatePath } from "next/cache";
import { DEFAULT_LOGOUT_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

export async function cookieServer() {
  return cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
}

export async function getCurrentUser() {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.currentUser(allCookie);
  return success ? data : undefined;
}

export async function recover(email: string) {
  const { success, data } = await authApi.recover(email);
  return { success, message: data.message };
}

export async function disactivateAccount(path?: string) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success } = await userApi.disactivateAccount(allCookie);
  if (success) {
    cookies().delete("session");
    if (path) revalidatePath(path);
    redirect(DEFAULT_LOGOUT_REDIRECT);
  }
}

export async function signOut(path?: string) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success } = await userApi.disactivateAccount(allCookie);
  await userApi.signOut(allCookie);
  cookies().delete("session");
  if (path) revalidatePath(path);
  redirect(DEFAULT_LOGOUT_REDIRECT);
}
