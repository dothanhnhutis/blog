import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const SessionsPage = () => {
  return (
    <div className="mx-auto max-w-screen-lg w-full bg-white p-4">
      <div className="min-[300px]:flex-row w-full gap-4 border-b pb-4">
        <h3 className="text-3xl font-bold">Sessions</h3>
        <p className="text-xs font-normal leading-snug text-muted-foreground">
          This is a list of devices that have logged into your account. Revoke
          any sessions that you do not recognize.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 py-4 ">
        <div className="flex flex-col min-[400px]:flex-row sm:grid gap-2 border-b sm:border p-2 sm:rounded-2xl">
          <div className="text-sm w-full">
            <p>42.116.126.235</p>
            <p>Chrome on Macintosh</p>
            <p>Last accessed: Aug 21, 2024</p>
            <p>Signed in: Aug 21, 2024</p>
          </div>
          <Separator className="hidden sm:block" />
          <Button variant="ghost">Revoke</Button>
        </div>
        <div className="flex flex-col min-[400px]:flex-row sm:grid gap-2 border-b sm:border p-2 sm:rounded-2xl">
          <div className="text-sm w-full">
            <p>42.116.126.235</p>
            <p>Chrome on Macintosh</p>
            <p>Last accessed: Aug 21, 2024</p>
            <p>Signed in: Aug 21, 2024</p>
          </div>
          <Separator className="hidden sm:block" />
          <div className="flex items-center justify-center text-sm text-center text-nowrap align-middle h-10">
            <p>Current Session</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
