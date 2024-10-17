interface FetchApiDefault extends Omit<RequestInit, "body"> {
  baseUrl?: string;
}

interface FetchApiConfig extends FetchApiDefault {
  url?: string;
  data?: any;
}

async function fetchApi(method: string, url?: string, config?: FetchApiConfig) {
  const fullUrl = url?.startsWith("/")
    ? config?.baseUrl + url
    : config?.baseUrl + "/" + url;

  let newConfig: RequestInit | undefined;
  if (config) {
    const { baseUrl, data, url, ...rest } = config;
    newConfig = rest;
    if (data) {
      if (
        data instanceof FormData ||
        data instanceof Blob ||
        data instanceof ArrayBuffer ||
        typeof data == "string"
      ) {
        newConfig.body = data;
      } else if (typeof data == "object") {
        newConfig.body = JSON.stringify(data);
      }
    }
  }

  if (config) {
    delete config["data"];
    newConfig = config;
  }

  try {
    const response = await fetch(fullUrl, {
      method,
      ...newConfig,
    });

    if (!response.ok) {
      throw new FetchApiError("");
    }

    const dataResponse = await response.json();

    return dataResponse;
  } catch (error: unknown) {
    if (error instanceof FetchApiError) {
    }
    if (error instanceof TypeError) {
    }
  }
}

class FetchApiError extends Error {
  constructor() {
    super();
  }
}
