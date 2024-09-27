interface Cookie {
  name: string;
  value: string;

  //   encode?(value: string): string;

  domain?: string | undefined;
  path?: string | undefined;

  expires?: Date | undefined;
  maxAge?: number | undefined;

  partitioned?: boolean | undefined;
  secure?: boolean | undefined;
  httpOnly?: boolean | undefined;

  sameSite?: boolean | "lax" | "strict" | "none" | undefined;
  priority?: "low" | "medium" | "high" | undefined;
}

export function parseCookie(cookieStr: string): Cookie {
  const parts = cookieStr.split("; ").map((part) => part.trim());
  const [name, value] = parts[0].split("=").map(decodeURIComponent);
  const cookieDict: Partial<Cookie> = { name, value };

  parts.slice(1).forEach((part) => {
    const [key, val] = part.split("=").map(decodeURIComponent);
    switch (key.toLowerCase()) {
      case "domain":
        cookieDict.domain = val;
        break;
      case "path":
        cookieDict.path = val;
        break;
      case "expires":
        cookieDict.expires = new Date(val);
        break;
      case "max-age":
        cookieDict.maxAge = parseInt(val);
        break;
      case "samesite":
        cookieDict.sameSite =
          val === "true" || val === "false"
            ? val === "true"
            : (val as Cookie["sameSite"]);
        break;
      case "priority":
        cookieDict.priority = val as Cookie["priority"];
        break;
      case "secure":
        cookieDict.secure = true;
        break;
      case "httponly":
        cookieDict.httpOnly = true;
        break;
      case "partitioned":
        cookieDict.partitioned = true;
        break;
    }
  });

  if (!cookieDict.name || !cookieDict.value) {
    throw new Error("Invalid cookie string");
  }

  return cookieDict as Cookie;
}

export function cookieParser(cookie: string) {
  let match = cookie.match(/^(\w+)=([^;]+);/);
  if (!match) return;
  let obj: Cookie = {
    name: match[1],
    value: match[2],
  };

  let domainMatch = cookie.match(/Domain=([^;]+);?/);
  if (domainMatch) obj.domain = domainMatch[1];

  let pathMatch = cookie.match(/Path=([^;]+);?/);
  if (pathMatch) obj.path = pathMatch[1];

  let expiresMatch = cookie.match(/Expires=([^;]+);?/);
  if (expiresMatch) obj.expires = new Date(expiresMatch[1]);

  let maxAgeMatch = cookie.match(/Max-Age=([^;]+);?/);
  if (maxAgeMatch) obj.maxAge = parseInt(maxAgeMatch[1]);

  if (/Secure/.test(cookie)) obj.secure = true;
  if (/HttpOnly/.test(cookie)) obj.httpOnly = true;

  let sameSiteMatch = cookie.match(/SameSite=([^;]+);?/);
  if (sameSiteMatch)
    obj.sameSite = sameSiteMatch[1].toLowerCase() as Cookie["sameSite"];

  let priorityMatch = cookie.match(/Priority=([^;]+);?/);
  if (priorityMatch)
    obj.priority = priorityMatch[1].toLowerCase() as Cookie["priority"];

  if (/Partitioned/.test(cookie)) obj.partitioned = true;

  return obj;
}
