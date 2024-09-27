import React, { cache } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  ChevronRightIcon,
  EyeIcon,
  UserIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { format, isPast } from "date-fns";
// import { getPostById } from "@/service/api/post";
import { Metadata, ResolvingMetadata } from "next";
import { baseOpenGraph } from "@/app/shared-metadata";
import configs from "@/config";
import constants from "@/constants";

type PostDetailPageProps = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: PostDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post: any = {};
  if (!post)
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  const url = configs.NEXT_PUBLIC_CLIENT_URL + "/bai-viet/" + post.slug;
  return {
    title: post.title,
    description: post.contentText,
    alternates: {
      canonical: url,
      // languages: {
      //   "en-US": "/en-US",
      //   "de-DE": "/de-DE",
      // },
    },
    openGraph: {
      ...baseOpenGraph,
      title: post.title,
      description: post.contentText,
      url,
      siteName: "Công ty TNHH MTV TM Sản Xuất I.C.H",
      images: [
        {
          url: post.image,
          // width: 800,
          // height: 600,
        },
      ],
    },
  };
}

// type PostDetailPageProps = {
//   params: { slug: string };
// };
// export async function generateMetadata({ params }: PostDetailPageProps) {
//   try {
//     const post = await getPostById(params.slug);
//     if (!post || !post.isActive || !isPast(post.publishAt))
//       return {
//         title: "Not Found",
//         description: "The page you are looking for does not exist.",
//       };
//     return {
//       title: post.title,
//       description: post.contentText,
//       alternates: {
//         canonical: `/bai-viet/${post.slug}`,
//         // languages: {
//         //   "en-US": `/en-US/bai-viet/${post.slug}`,
//         //   "de-DE": `/de-DE/bai-viet/${post.slug}`,
//         // },
//       },
//     };
//   } catch (error) {
//     return {
//       title: "Not Found",
//       description: "The page you are looking for does not exist.",
//     };
//   }
// }

const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const post: any = {};

  if (!post || !post.isActive || !isPast(post.publishAt)) return notFound();
  return (
    <div className="mx-auto xl:max-w-screen-xl px-2">
      <nav className="py-5">
        <p className="text-base align-middle">
          <Link
            href="/"
            prefetch
            className="inline hover:text-primary font-medium"
          >
            Trang chủ
          </Link>
          <ChevronRightIcon className="w-4 h-4 inline mx-1" />
          <Link
            href="/bai-viet"
            prefetch
            className="inline hover:text-primary font-medium"
          >
            Bài viết
          </Link>

          <ChevronRightIcon className="w-4 h-4 inline mx-1" />
          <span className="font-normal">{post.title}</span>
        </p>
      </nav>
      <h1 className="text-primary font-bold text-3xl mb-4">{post.title}</h1>
      <div className="flex justify-between items-center border-t border-b border-dashed py-2 mb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm">
            {format(new Date(post.publishAt), "dd/MM/yyyy")}
          </span>
          <UserIcon className="w-5 h-5" />
          <span className="text-sm">{post.author.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <EyeIcon className="w-4 h-4" />
          <span className="text-sm">10000</span>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHTML }} />

      <p className="text-xl font-light text-black-100 mb-3 mt-32 ">
        <strong className="font-bold">{constants.company}</strong>
      </p>
      <p className="text-sm font-light text-black-100 mb-3">
        Văn phòng & Nhà máy: {constants.addressCompany}
      </p>
      <p className="text-sm font-light text-black-100 mb-3 truncate">
        Hotline: {constants.phoneNumberCompany}
      </p>
      <p className="text-sm font-light text-black-100 mb-3 truncate">
        Email: {constants.emailCompany}
      </p>
    </div>
  );
};

export default PostDetailPage;
