import React from "react";
import TaskProvider from "@/components/providers/task-provider";

const TastLayout = ({ children }: { children: React.ReactNode }) => {
  return <TaskProvider>{children}</TaskProvider>;
};

export default TastLayout;
