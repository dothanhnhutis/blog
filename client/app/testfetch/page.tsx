"use client";
import http from "@/service/http";
import React from "react";

const page = () => {
  React.useEffect(() => {
    const handleReq = async () => {
      const data = await http.post<{ message: string; sessionId?: string }>(
        "/auth/signin",
        {
          email: "gaconght@gmail.com",
          password: "@asdasdasdasdsa",
        }
      );
      console.log(data);
    };
    handleReq();
  }, []);
  return <div>page</div>;
};

export default page;
