"use client";
import React from "react";

import axios, { isAxiosError } from "axios";
import { FetchApiError, http } from "./fetch-api";

const TestFetchPage = () => {
  React.useEffect(() => {
    const startFetch = async () => {
      try {
        const { data: datas } = await http.post<{ message: string }>(
          "/auth/signin",
          {
            email: "gaconght@gmail.com",
            password: "@Abc1231233",
          }
        );
        console.log("--------data--------");
      } catch (error) {
        if (error instanceof FetchApiError) {
          console.log("--------error--------");
          console.log(error.toJSON());
        } else if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.log(error);
        }
      }
      console.log(new Error("Nhut"));
    };
    startFetch();
  }, []);

  return <div>TestFetchPage</div>;
};

export default TestFetchPage;
