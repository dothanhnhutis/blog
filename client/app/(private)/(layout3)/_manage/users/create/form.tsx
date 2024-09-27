"use client";
import React from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AiOutlineCheck } from "react-icons/ai";
import {
  Check,
  ChevronDownIcon,
  Loader2,
  LoaderPinwheelIcon,
  OctagonAlertIcon,
  OctagonPauseIcon,
  OctagonXIcon,
} from "lucide-react";

import { CreateUserInput, createUserSchema } from "@/schemas/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/password-input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import Tiptap from "@/components/tiptap/tiptap";

const rolesDropDown: {
  id: number;
  name: string;
  subtitle: string;
}[] = [
  {
    id: 1,
    name: "Manager",
    subtitle: "Can manage post and invoice",
  },
  {
    id: 2,
    name: "Saler",
    subtitle: "Can manage invoice",
  },
  {
    id: 3,
    name: "Bloger",
    subtitle: "Can manage post",
  },
  {
    id: 4,
    name: "Customer",
    subtitle: "Just normal user",
  },
];

const CreateUserForm = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [formData, setFormData] = React.useState<CreateUserInput>({
    email: "",
    password: "",
    status: "Active",
    role: "Customer",
    firstName: "",
    lastName: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isError = React.useCallback(
    (field?: "firstName" | "lastName" | "email" | "password" | undefined) => {
      const val = createUserSchema.safeParse(formData);
      if (val.success) return [];
      switch (field) {
        case "firstName":
          return val.error.issues.filter((err) =>
            err.path.includes("firstName")
          );
        case "lastName":
          return val.error.issues.filter((err) =>
            err.path.includes("lastName")
          );
        case "email":
          return val.error.issues.filter((err) => err.path.includes("email"));
        case "password":
          return val.error.issues.filter((err) =>
            err.path.includes("password")
          );
        default:
          return val.error.issues;
      }
    },
    [formData]
  );

  const [focused, setFocused] = React.useState<string[]>([]);
  const handleOnChangFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (e.type == "blur" && !focused.includes(e.target.name)) {
      setFocused((prev) => [...prev, e.target.name]);
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: CreateUserInput) => {
      // return await createUser(input);
    },
    onSuccess: () => {
      // if (success) {
      //   queryClient.invalidateQueries({ queryKey: ["user", "active"] });
      //   toast.success(message);
      //   router.push("/manager/users?tab=active");
      // } else {
      //   toast.error(message);
      // }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isError().length > 0) return;
    mutate(formData);
  };
  return (
    <div></div>
    // <form onSubmit={handleSubmit} className="bg-card border p-4 rounded-lg">

    //   <div className="grid md:grid-cols-2 gap-4">
    //     <div className="flex flex-col gap-2">
    //       <Label htmlFor="firstName">First name</Label>
    //       <Input
    //         onBlur={handleOnChangFocus}
    //         disabled={isPending}
    //         onChange={handleOnChange}
    //         value={formData.firstName}
    //         id="firstName"
    //         name="firstName"
    //         className="focus-visible:ring-transparent "
    //         placeholder="First name"
    //       />
    //       {focused.includes("firstName") &&
    //         isError("firstName").map((error, idx) => (
    //           <p key={idx} className="text-red-500 text-xs font-bold">
    //             {error.message}
    //           </p>
    //         ))}
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <Label htmlFor="lastName">Last name</Label>
    //       <Input
    //         onBlur={handleOnChangFocus}
    //         disabled={isPending}
    //         onChange={handleOnChange}
    //         value={formData.lastName}
    //         id="lastName"
    //         name="lastName"
    //         className="focus-visible:ring-transparent "
    //         placeholder="Last name"
    //       />
    //       {focused.includes("lastName") &&
    //         isError("lastName").map((error, idx) => (
    //           <p key={idx} className="text-red-500 text-xs font-bold">
    //             {error.message}
    //           </p>
    //         ))}
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <Label htmlFor="email">Email</Label>
    //       <Input
    //         onBlur={handleOnChangFocus}
    //         disabled={isPending}
    //         onChange={handleOnChange}
    //         value={formData.email}
    //         id="email"
    //         name="email"
    //         className="focus-visible:ring-transparent"
    //         placeholder="Email"
    //       />
    //       {focused.includes("email") &&
    //         isError("email").map((error, idx) => (
    //           <p key={idx} className="text-red-500 text-xs font-bold">
    //             {error.message}
    //           </p>
    //         ))}
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <Label htmlFor="role">Role</Label>
    //       <Popover open={open} onOpenChange={setOpen}>
    //         <PopoverTrigger asChild>
    //           <Button
    //             disabled={isPending}
    //             id="role"
    //             variant="outline"
    //             role="combobox"
    //             className="justify-between"
    //           >
    //             {formData.role}
    //             <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //           </Button>
    //         </PopoverTrigger>
    //         <PopoverContent className="w-auto p-0">
    //           <Command>
    //             <CommandList>
    //               <CommandGroup>
    //                 {rolesDropDown.map((r) => (
    //                   <CommandItem
    //                     key={r.id}
    //                     value={r.name}
    //                     onSelect={(currentValue) => {
    //                       setFormData((prev) => ({
    //                         ...prev,
    //                         role: currentValue as CreateUserInput["role"],
    //                       }));
    //                       setOpen(false);
    //                     }}
    //                   >
    //                     <Check
    //                       className={cn(
    //                         "mr-2 h-4 w-4",
    //                         r.name == formData.role
    //                           ? "opacity-100"
    //                           : "opacity-0"
    //                       )}
    //                     />
    //                     <div>
    //                       <Label>{r.name}</Label>
    //                       <p className="text-xs font-normal leading-snug text-muted-foreground">
    //                         {r.subtitle}
    //                       </p>
    //                     </div>
    //                   </CommandItem>
    //                 ))}
    //               </CommandGroup>
    //             </CommandList>
    //           </Command>
    //         </PopoverContent>
    //       </Popover>
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <Label htmlFor="password">Password</Label>
    //       <PasswordInput
    //         disabled={isPending}
    //         id="password"
    //         autoComplete="off"
    //         placeholder="Password"
    //         name="password"
    //         onChange={handleOnChange}
    //         value={formData.password}
    //         onBlur={handleOnChangFocus}
    //       />
    //       <div className="flex flex-col justify-center">
    //         <p className="font-medium text-sm">Your password must include:</p>
    //         <p
    //           className={cn(
    //             "inline-flex space-x-2 items-center text-gray-500",
    //             isError("password").filter(
    //               (err) => err.code == "too_small" || err.code == "too_big"
    //             ).length > 0
    //               ? ""
    //               : "text-green-400"
    //           )}
    //         >
    //           <AiOutlineCheck size={16} />
    //           <span className="font-medium text-xs">8 to 40 characters</span>
    //         </p>
    //         <p
    //           className={cn(
    //             "inline-flex space-x-2 items-center text-gray-500",
    //             isError("password").filter((err) => err.code == "custom")
    //               .length > 0
    //               ? ""
    //               : "text-green-400"
    //           )}
    //         >
    //           <AiOutlineCheck size={16} />
    //           <span className="font-medium text-xs">
    //             Letters, numbers and special characters
    //           </span>
    //         </p>
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <Label htmlFor="email">Status</Label>
    //       <div className="flex gap-4">
    //         <ToggleGroup
    //           type="single"
    //           className="gap-4 w-full max-[400px]:flex-col"
    //           value={formData.status}
    //           onValueChange={(value) => {
    //             setFormData((prev) => ({
    //               ...prev,
    //               status: value as CreateUserInput["status"],
    //             }));
    //           }}
    //         >
    //           <ToggleGroupItem
    //             disabled={isPending}
    //             variant="outline"
    //             value="Active"
    //             aria-label="Active"
    //             className="size-full flex-col items-center justify-center gap-2 p-4 min-[400px:p-4"
    //           >
    //             <OctagonPauseIcon className="size-6 flex-shrink-0" />
    //             Active
    //           </ToggleGroupItem>
    //           <ToggleGroupItem
    //             disabled={isPending}
    //             variant="outline"
    //             size="lg"
    //             value="Suspended"
    //             aria-label="Suspend"
    //             className="size-full flex-col items-center justify-center gap-2 p-4 min-[400px:p-4"
    //           >
    //             <OctagonAlertIcon className="size-6 flex-shrink-0" />
    //             Suspend
    //           </ToggleGroupItem>
    //           <ToggleGroupItem
    //             disabled={isPending}
    //             variant="outline"
    //             size="lg"
    //             value="Disabled"
    //             aria-label="Disable"
    //             className="flex-col items-center justify-center gap-2 size-full p-4 min-[400px]:p-4"
    //           >
    //             <OctagonXIcon className="size-6 flex-shrink-0" />
    //             Disable
    //           </ToggleGroupItem>
    //         </ToggleGroup>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex flex-col sm:flex-row gap-2 justify-end mt-8">
    //     <Button
    //       disabled={isPending}
    //       type="button"
    //       variant="outline"
    //       size="lg"
    //       onClick={() => {
    //         router.back();
    //       }}
    //     >
    //       Cancel
    //     </Button>
    //     <Button disabled={isPending} type="submit" size="lg">
    //       {isPending && (
    //         <LoaderPinwheelIcon className=" h-4 w-4 mx-3.5 animate-spin mr-2" />
    //       )}
    //       Create
    //     </Button>
    //   </div>
    // </form>
  );
};

export default CreateUserForm;
