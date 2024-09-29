import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { EditUserForm } from "./form";

const EditUserPage = async ({ params: { id } }: { params: { id: string } }) => {
  // const user = await getUserById(id);
  // if (!user || user.role == "Admin") notFound();

  return (
    <>
      <Link
        href="/manager/users?tab=active"
        className="gap-1 hover:bg-secondary inline-flex py-1 px-2 items-center justify-center rounded"
      >
        <ChevronLeftIcon className="size-4" />
        <p className="text-xs font-light">Back</p>
      </Link>
      <h2 className="lg:text-3xl font-bold text-2xl mb-3">Edit User</h2>

      <EditUserForm
        user={{
          email: "",
          emailVerified: true,
          role: "Admin",
          status: "Active",
          mFAEnabled: true,
          hasPassword: true,
          id: "",
          oauthProviders: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          profile: {
            id: "",
            firstName: "",
            lastName: "",
            address: "",
            apartment: "",
            city: "",
            country: "",
            zipCode: "",
            phone: "",
            picture: "",
            province: "",
          },
        }}
      />
    </>
  );
};

export default EditUserPage;
