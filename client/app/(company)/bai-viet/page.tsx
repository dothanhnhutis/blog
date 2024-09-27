// import { queryPost } from "@/service/api/post";
// import { getAllTag } from "@/service/api/tag";
import React, { Suspense } from "react";
import Image from "next/image";

import Tags from "./tags";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import PaginationH from "./pagination";
import { vi } from "date-fns/locale";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

type PostListPageProps = {
  searchParams: {
    tag?: string;
    page?: string;
  };
};

const PostListPage = async ({ searchParams }: PostListPageProps) => {
  const { posts, metadata }: { posts: any[]; metadata: any } = {
    posts: [],
    metadata: {},
  };
  const tags: any = {};
  return (
    <div className="lg:mx-auto lg:max-w-screen-xl">
      <div className="mt-2 mx-auto">
        <h1 className="text-xl font-semibold text-center">Bài Viết</h1>
      </div>
      <div className="mb-10">
        <Suspense>
          <Tags tags={tags} />
        </Suspense>
        {posts.length == 0 ? (
          <p className="text-center h-[500px]">
            Không tìm thấy bài viết nào khớp với lựa chọn của bạn.
          </p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/bai-viet/${post.slug}`}
                  className="rounded-lg overflow-hidden bg-accent"
                >
                  <div className="bg-muted">
                    <Image
                      priority
                      src={post.image}
                      alt="image"
                      height={600}
                      width={800}
                      className="rounded-md object-cover aspect-[4/3]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <Badge>
                        <p className="line-clamp-1">{post.tag.name}</p>
                      </Badge>
                      <p className="text-sm line-clamp-1">
                        {format(new Date(post.publishAt), "PP", { locale: vi })}
                      </p>
                    </div>
                    <h4 className="font-bold text-lg line-clamp-2 hover:text-primary">
                      {post.title}
                    </h4>
                    <p className="line-clamp-2 text-sm">{post.shortContent}</p>
                  </div>
                </Link>
              ))}
            </div>
            {metadata.totalPage > 1 && (
              <PaginationH
                {...searchParams}
                currentPage={parseInt(searchParams.page ?? "1")}
                hasPrevPage={parseInt(searchParams.page ?? "1") > 1}
                {...metadata}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostListPage;
