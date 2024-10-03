"use server";
import userApi from "@/service/collections/user-collections";
import {
  CreatePasswordInput,
  EditPasswordInput,
  EditPictureInput,
  EditProfileInput,
} from "@/schemas/user";
import { cookies } from "next/headers";

export async function editProfile(input: EditProfileInput) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.editProfile(allCookie, input);
  return { success, message: data.message };
}

export async function editPicture(input: EditPictureInput) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.editPicture(allCookie, input);
  return { success, message: data.message };
}

export async function editPassword(input: EditPasswordInput) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.editPassword(allCookie, input);
  return { success, message: data.message };
}

export async function createPassword(
  input: Omit<EditPasswordInput, "oldPassword">
) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.createPassword(allCookie, input);
  return { success, message: data.message };
}

export async function setMFA(deviceName: string) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.setupMFA(allCookie, deviceName);
  if (success) {
    return { success, message: data.message, data: data.data };
  } else {
    return { success, message: data.message };
  }
}

export async function enableMFA(input: {
  mfa_code1: string;
  mfa_code2: string;
}) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.enableMFA(allCookie, input);
  if (success) {
    return { success, message: data.message, data: data.data };
  } else {
    return { success, message: data.message };
  }
}

export async function disableMFA(input: {
  mfa_code1: string;
  mfa_code2: string;
}) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.disableMFA(allCookie, input);
  return { success, message: data.message };
}

export async function disconnectOauth(input: {
  provider: string;
  providerId: string;
}) {
  const allCookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.disconnectOauthProvider(
    allCookie,
    input
  );
  return { success, message: data.message };
}
