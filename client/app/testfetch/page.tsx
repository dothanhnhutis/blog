"use client";
import React from "react";

import axios from "axios";

const TestFetchPage = () => {
  React.useEffect(() => {
    const startFetch = async () => {
      try {
        const data = await axios.post<{ message: string }>(
          "http://localhost:4000/api/v1/auth/signin",
          {
            email: "gaconght@gmail.com",
            password: "@Abc1231233",
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    startFetch();
  }, []);

  return <div>TestFetchPage</div>;
};

export default TestFetchPage;
