type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

interface FetchRequestConfig<D = any> extends Omit<RequestInit, "body"> {
  url?: string;
  method?: Method | string;
  baseURL?: string;
  data?: D;
}

const fetchAPI = (method: Method, url: string) => {
  try {
    fetch("", {
      method: "",
    });
  } catch (error) {}
};

export const http = {
  post(url: string) {
    return fetchAPI("POST", url);
  },
  post(url: string) {
    return fetchAPI("POST", url);
  },
};
