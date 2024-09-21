import configs from "@/config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/manager/", "/account/"],
      },
    ],
    sitemap: `${configs.NEXT_PUBLIC_CLIENT_URL}/sitemap.xml`,
  };
}
