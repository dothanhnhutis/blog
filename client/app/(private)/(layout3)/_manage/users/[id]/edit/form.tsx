"use client";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { EditUserInput, editUserSchema, User } from "@/schemas/user";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CheckIcon,
  ChevronDownIcon,
  LoaderPinwheelIcon,
  OctagonAlertIcon,
  OctagonPauseIcon,
  OctagonXIcon,
} from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import configs from "@/config";

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

export const EditUserForm = ({ user }: { user: User }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const router = useRouter();
  const [formData, setFormData] = React.useState<EditUserInput>({
    role: "Admin",
    address: "",
    firstName: "",
    lastName: "",
    status: "Active",
    phone: "",
  });

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isError = React.useCallback(
    (field?: "firstName" | "lastName" | "phone" | "address" | undefined) => {
      const val = editUserSchema.safeParse(formData);
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
        case "phone":
          return val.error.issues.filter((err) => err.path.includes("phone"));
        case "address":
          return val.error.issues.filter((err) => err.path.includes("address"));
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
    mutationFn: async (input: EditUserInput) => {
      // return await editUserById(user.id, formData);
    },
    onSuccess: () => {
      // if (success) {
      //   queryClient.invalidateQueries({ queryKey: ["users"] });
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
    <form onSubmit={handleSubmit} className="bg-card border p-4 rounded-lg">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col items-center gap-2 col-span-2">
          <Label htmlFor="phone">Avatar</Label>
          <Avatar className="size-28">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={configs.NEXT_PUBLIC_PHOTO_URL}
            />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="size-28 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-2 max-[400px]:col-span-2">
          <Label htmlFor="phone">SID</Label>
          <p className="text-sm font-normal leading-snug text-muted-foreground">
            {user.id.split("-").pop()}
          </p>
        </div>
        <div className="flex flex-col gap-2 max-[400px]:col-span-2">
          <Label>Email</Label>
          <p className="text-sm font-normal leading-snug text-muted-foreground truncate">
            {user.email}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            className="focus-visible:ring-transparent "
            placeholder="First name"
            disabled={isPending}
            value={formData.firstName}
            onChange={handleOnchange}
            onBlur={handleOnChangFocus}
          />
          {focused.includes("firstName") &&
            isError("firstName").map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs font-bold">
                {error.message}
              </p>
            ))}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            className="focus-visible:ring-transparent "
            placeholder="Last name"
            disabled={isPending}
            value={formData.lastName}
            onChange={handleOnchange}
            onBlur={handleOnChangFocus}
          />
          {focused.includes("lastName") &&
            isError("lastName").map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs font-bold">
                {error.message}
              </p>
            ))}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            className="focus-visible:ring-transparent "
            placeholder="Phone number"
            disabled={isPending}
            value={formData.phone}
            onChange={handleOnchange}
            onBlur={handleOnChangFocus}
          />
          {focused.includes("phone") &&
            isError("phone").map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs font-bold">
                {error.message}
              </p>
            ))}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            className="focus-visible:ring-transparent "
            placeholder="Address"
            disabled={isPending}
            value={formData.address}
            onChange={handleOnchange}
            onBlur={handleOnChangFocus}
          />
          {focused.includes("address") &&
            isError("address").map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs font-bold">
                {error.message}
              </p>
            ))}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="role">Role</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                disabled={isPending}
                id="role"
                variant="outline"
                role="combobox"
                className="justify-between"
              >
                {formData.role}
                <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {rolesDropDown.map((r) => (
                      <CommandItem
                        key={r.id}
                        value={r.name}
                        onSelect={(currentValue) => {
                          setFormData((prev) => ({
                            ...prev,
                            role: currentValue as EditUserInput["role"],
                          }));
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            r.name == formData.role
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div>
                          <Label>{r.name}</Label>
                          <p className="text-xs font-normal leading-snug text-muted-foreground">
                            {r.subtitle}
                          </p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Status</Label>
          <div className="flex gap-4">
            <ToggleGroup
              type="single"
              className="gap-4 w-full max-[400px]:flex-col"
              value={formData.status}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  status: value as EditUserInput["status"],
                }));
              }}
            >
              <ToggleGroupItem
                disabled={isPending}
                variant="outline"
                value="Active"
                aria-label="Active"
                className="size-full flex-col items-center justify-center gap-2 p-4 min-[400px:p-4"
              >
                <OctagonPauseIcon className="size-6 flex-shrink-0" />
                Active
              </ToggleGroupItem>
              <ToggleGroupItem
                disabled={isPending}
                variant="outline"
                size="lg"
                value="Suspended"
                aria-label="Suspend"
                className="size-full flex-col items-center justify-center gap-2 p-4 min-[400px:p-4"
              >
                <OctagonAlertIcon className="size-6 flex-shrink-0" />
                Suspend
              </ToggleGroupItem>
              <ToggleGroupItem
                disabled={isPending}
                variant="outline"
                size="lg"
                value="Disabled"
                aria-label="Disable"
                className="flex-col items-center justify-center gap-2 size-full p-4 min-[400px]:p-4"
              >
                <OctagonXIcon className="size-6 flex-shrink-0" />
                Disable
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 justify-end mt-8">
        <Button
          disabled={isPending}
          type="button"
          variant="outline"
          size="lg"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isPending} type="submit" size="lg">
          {isPending && (
            <LoaderPinwheelIcon className=" h-4 w-4 mx-3.5 animate-spin mr-2" />
          )}
          Save
        </Button>
      </div>
    </form>
  );
};
