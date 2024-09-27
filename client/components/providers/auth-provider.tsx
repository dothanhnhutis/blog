"use client";
import { getCurrentUser } from "@/app/actions";
import { User } from "@/schemas/user";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

const authContext = createContext<{ currentUser: User | undefined }>({
  currentUser: undefined,
});

export const useAuthContext = () => useContext(authContext);

export const AuthProvider = ({
  initUser,
  children,
}: {
  initUser?: User;
  children: React.ReactNode;
}) => {
  const { data } = useQuery({
    initialData: initUser,
    queryKey: ["me"],
    queryFn: async () => {
      return await getCurrentUser();
    },
  });

  return (
    <authContext.Provider value={{ currentUser: data }}>
      {children}
    </authContext.Provider>
  );
};
