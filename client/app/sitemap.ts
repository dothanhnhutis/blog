import configs from "@/config";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: configs.NEXT_PUBLIC_CLIENT_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: configs.NEXT_PUBLIC_CLIENT_URL + "/ve-ich",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: configs.NEXT_PUBLIC_CLIENT_URL + "/lien-he",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: configs.NEXT_PUBLIC_CLIENT_URL + "/chinh-sach-bao-hanh",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: configs.NEXT_PUBLIC_CLIENT_URL + "/chinh-sach-thanh-toan",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: configs.NEXT_PUBLIC_CLIENT_URL + "/chinh-sach-bao-mat",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
