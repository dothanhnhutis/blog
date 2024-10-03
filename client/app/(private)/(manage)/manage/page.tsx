import React from "react";

const NewLayout = async () => {
  return (
    <div className="w-full bg-background p-4 max-w-screen-xl mx-auto md:rounded-xl md:min-h-[calc(100vh_-_64px)]">
      <h3 className="font-bold text-2xl">Account settings</h3>
      <p className="text-sm font-normal leading-snug text-muted-foreground">
        Manage your account settings and set e-mail preferences.
      </p>
    </div>
  );
};

export default NewLayout;
