import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import PostTable from "./table";

const PostManagementPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-4xl">Post Management</h3>
        <Link
          href="/manage/posts/create"
          className="flex items-center gap-1 px-3 py-2 bg-secondary rounded-lg"
        >
          <PlusIcon className="flex-shrink-0 size-5" />
          <span className="hidden md:inline text-sm">Create new post</span>
        </Link>
      </div>
      <PostTable />
    </div>
  );
};

export default PostManagementPage;
