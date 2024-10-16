"use server";

import { SignInInput } from "@/schemas/auth";
import { http, FetchError, FetchErrorData } from "./http";
import { headers } from "next/headers";
import configs from "@/config";

export type FetchHttpOption1 = RequestInit & {
  baseUrl?: string;
};
export type FetchErrorData1 = {
  statusCode: number;
  headers: Headers;
  data: { message: string };
};

async function fetchHttp1<T, E>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options?: FetchHttpOption1
) {
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const baseUrl =
    options?.baseUrl || configs.NEXT_PUBLIC_SERVER_URL + "/api/v1";
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  if (!res.ok) {
    const data = (await res.json()) as E;
    throw new FetchError({
      headers: res.headers,
      statusCode: res.status,
      data,
    });
  }

  const data = (await res.json()) as T;
  return {
    statusCode: res.status,
    headers: res.headers,
    data,
  };
}

const testFetch = async () => {
  try {
    return await fetchHttp1<
      { message: string; mfa: string },
      { message: string }
    >("POST", "/auth/signin", {
      body: JSON.stringify({
        email: "asdsa",
        password: "",
      }),
    });
  } catch (error) {
    if (error instanceof FetchError) {
      error.serialize().data;
    } else if (error instanceof TypeError) {
      message = error.message;
    }
  }
};

export async function signin() {
  await testFetch();

  try {
    return await http.post<
      { message: string; mfa: string },
      { message: string }
    >("/auth/signin", {});
  } catch (error) {
    if (error instanceof FetchError) {
      error.serialize().data;
    } else if (error instanceof TypeError) {
      message = error.message;
    }
  }
}
