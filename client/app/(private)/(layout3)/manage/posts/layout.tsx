import React from "react";

const PostManageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background p-4 max-w-screen-2xl mx-auto md:rounded-xl mb-2">
      {children}
    </div>
  );
};

export default PostManageLayout;
