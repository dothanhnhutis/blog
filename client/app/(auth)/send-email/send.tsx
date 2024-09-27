"use client";
import React, { useEffect } from "react";
import { clearSendEmail } from "../actions";

const Send = () => {
  useEffect(() => {
    const handleClearSendEmail = async () => {
      await clearSendEmail();
    };
    handleClearSendEmail();
  }, []);
  return <div>SendEmail</div>;
};

export default Send;
