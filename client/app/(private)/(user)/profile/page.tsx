"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Textarea } from "@/components/ui/textarea";
import { FaFacebookSquare, FaTiktok } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import {
  CalendarIcon,
  CameraIcon,
  ImageIcon,
  MapPinIcon,
  PenSquareIcon,
  SaveIcon,
  SmartphoneIcon,
  UserPenIcon,
  XIcon,
} from "lucide-react";
import configs from "@/config";
import EditProfileForm from "./edit-profile-form";
import EditPhoto from "./edit-avatar-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ProfilePage = () => {
  const { currentUser } = useAuthContext();
  const date = new Date();
  return (
    <div className="mx-auto max-w-screen-lg w-full bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-3xl font-bold">Profile</h3>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            This information will be displayed publicly for shipper
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex gap-2 items-center justify-center rounded-lg px-2 py-1 hover:bg-accent hover:text-accent-foreground">
              <span className="hidden sm:inline text-base font-medium text-muted-foreground">
                Edit
              </span>
              <UserPenIcon className="shrink-0 size-6" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="lg:max-w-screen-sm max-h-screen overflow-y-scroll">
            <p className="font-bold text-lg">Personal Information</p>
            <div className="grid  gap-4">
              <div className="grid gap-1">
                <Label
                  htmlFor="firstName"
                  className="text-sm text-muted-foreground"
                >
                  First name
                </Label>
                <Input
                  name="firstName"
                  id="firstName"
                  placeholder="First name"
                />
              </div>
              <div className="grid gap-1">
                <Label
                  htmlFor="lastName"
                  className="text-sm text-muted-foreground"
                >
                  Last name
                </Label>
                <Input id="lastName" name="lastName" placeholder="Last name" />
              </div>
              <div className="grid gap-1">
                <Label
                  htmlFor="birthDate"
                  className="text-sm text-muted-foreground"
                >
                  Date of birth
                </Label>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      id="birthDate"
                      variant={"outline"}
                      className={cn(
                        "gap-2 justify-between text-left font-normal",
                        !true && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="size-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(v) => {
                        // setFormData((prev) => ({
                        //   ...prev,
                        //   birhtDate: v || new Date(),
                        // }));
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-1">
                <Label
                  htmlFor="phone"
                  className="text-sm text-muted-foreground"
                >
                  Gender
                </Label>
                <RadioGroup
                  defaultValue="comfortable"
                  className="min-[512px]:grid-cols-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Famale</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">Compact</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div className="gap-4 flex items-center">
                <Button variant="outline" className="p-2">
                  <span>Cancel</span>
                </Button>
                <Button size="sm">
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {/* <EditProfileForm />
      <EditPhoto /> */}

      <div className="grid gap-2 sm:grid-cols-[1fr_minmax(200px,250px)] overflow-hidden mt-4">
        <div className="grid min-[300px]:grid-cols-2 gap-2 h-auto">
          <div>
            <label className="text-sm font-normal text-muted-foreground">
              First name
            </label>
            <p className="font-medium text-base">Thanh</p>
          </div>
          <div>
            <label className="text-sm font-normal text-muted-foreground">
              Last name
            </label>
            <p className="font-medium text-base">Nhut</p>
          </div>
          <div>
            <label className="text-sm font-normal text-muted-foreground">
              Phone number
            </label>
            <p className="font-medium text-base">0948548844</p>
            <button className="text-primary font-medium text-base">Add</button>
          </div>
          <div>
            <label className="text-sm font-normal text-muted-foreground">
              Gender
            </label>
            <p className="font-medium text-base">Male</p>
          </div>
          <div>
            <label className="text-sm font-normal text-muted-foreground">
              Date of Birth
            </label>
            <p className="font-medium text-base">09/10/1999</p>
          </div>
        </div>
        <div className="order-first sm:order-none flex flex-col gap-2 items-center justify-center">
          <Avatar className="size-32">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={
                currentUser?.profile?.picture || configs.NEXT_PUBLIC_PHOTO_URL
              }
            />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="size-32 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="text-xs font-normal leading-snug text-muted-foreground">
            <p>Format file: PNG, JPG, JPEG</p>
            <p>Maximum file size is 1 MB</p>
          </div>
          <div className="flex flex-col min-[300px]:flex-row gap-2 items-center justify-center w-full">
            <button className="w-full max-w-[150px] font-medium text-sm h-10 bg-primary rounded-lg text-white ">
              Change picture
            </button>
            <button className="w-full max-w-[150px] font-medium text-sm h-10 bg-red-500 rounded-lg text-white ">
              Delete picture
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full p-2">
    //   <EditProfileForm />
    //   <EditPhoto />
    //   <h3 className="text-3xl font-bold">Profile</h3>
    //   <p className="text-xs font-normal leading-snug text-muted-foreground">
    //     This information will be displayed publicly
    //   </p>

    //   <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 border-b last:border-none py-4">
    //     <div className="w-full col-span-4 lg:col-span-2">
    //       <p className="font-bold">Media</p>
    //       <p className="text-xs font-normal leading-snug text-muted-foreground">
    //         This information will be displayed publicly
    //       </p>
    //     </div>
    //     <div className="grid grid-cols-6 gap-4 col-span-5 lg:col-span-3 order-2">
    //       <div className="grid gap-1 col-span-6">
    //         <Label className="text-sm text-muted-foreground">Photo</Label>
    //         <div className="flex gap-2 flex-wrap items-center">
    //           <Avatar className="size-14">
    //             <AvatarImage
    //               referrerPolicy="no-referrer"
    //               src={
    //                 currentUser?.profile?.picture ||
    //                 configs.NEXT_PUBLIC_PHOTO_URL
    //               }
    //             />
    //             <AvatarFallback className="bg-transparent">
    //               <Skeleton className="size-20 rounded-full" />
    //             </AvatarFallback>
    //           </Avatar>
    //           <Button variant="outline">Change picture</Button>
    //         </div>
    //       </div>
    //       {/* <div className="grid gap-1 col-span-6">
    //         <Label className="text-sm text-muted-foreground">Cover photo</Label>
    //         <div className="flex gap-2 flex-wrap items-center justify-center p-4 border-2 border-dashed rounded-xl w-full h-[200px]">
    //           <div className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
    //             <FaImage className="size-14 flex-shrink-0" />
    //             <p>Upload a file or drag and drop</p>
    //             <p>PNG, JPG, GIF up to 10MB</p>
    //           </div>
    //         </div>
    //       </div> */}
    //       {/* <div className="grid gap-1 col-span-6">
    //         <Label className="text-sm text-muted-foreground">Bio</Label>
    //         <Textarea placeholder="Type your message here." maxLength={256} />
    //         <div className="flex justify-between">
    //           <p className="text-xs text-muted-foreground">
    //             Write a few sentences about yourself.
    //           </p>
    //           <p className="text-xs text-muted-foreground">0/256</p>
    //         </div>
    //       </div>
    //       <div className="grid gap-1 col-span-6">
    //         <Label className="text-sm text-muted-foreground">URLs</Label>
    //         <p className="text-xs font-normal text-muted-foreground">
    //           Add links to your website, blog, or social media profiles.
    //         </p>
    //         <div className="flex gap-2 items-center">
    //           <FaFacebookSquare className="flex-shrink-0 size-6 text-primary " />
    //           <p className="text-xs font-normal text-muted-foreground">
    //             https://facebooke.com/dothanhnhutis
    //           </p>
    //         </div>
    //         <div className="flex gap-2 items-center">
    //           <IoLogoYoutube className="flex-shrink-0 size-6 text-destructive" />
    //           <p className="text-xs font-normal text-muted-foreground">
    //             https://facebooke.com/dothanhnhutis
    //           </p>
    //         </div>
    //         <div className="flex gap-2 items-center">
    //           <FaTiktok className="flex-shrink-0 size-5 p-0.5 bg-black text-white rounded" />
    //           <p className="text-xs font-normal text-muted-foreground">
    //             https://facebooke.com/dothanhnhutis
    //           </p>
    //         </div>
    //       </div> */}
    //     </div>
    //     {/* <div className="flex justify-end order-1 lg:order-last">
    //       <Button className="rounded-full" variant="outline">
    //         Edit
    //       </Button>
    //     </div> */}
    //   </div>
    //   <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 border-b last:border-none py-4">
    //     <div className="w-full col-span-4 lg:col-span-2">
    //       <p className="font-bold">Personal Information</p>
    //       <p className="text-xs font-normal leading-snug text-muted-foreground">
    //         Use a permanent address where you can receive mail.
    //       </p>
    //     </div>
    //     <div className="grid grid-cols-6 gap-2 col-span-4 lg:col-span-3 order-2">
    //       <div className="grid gap-1 col-span-3">
    //         <Label className="text-sm text-muted-foreground">First name</Label>
    //         <p className="font-bold text-sm">Nhut</p>
    //       </div>
    //       <div className="grid gap-1 col-span-3">
    //         <Label className="text-sm text-muted-foreground">Last name</Label>
    //         <p className="font-bold text-sm">Thanh</p>
    //       </div>
    //       <div className="grid gap-1 col-span-3">
    //         <Label className="text-sm text-muted-foreground">
    //           Date of birth
    //         </Label>
    //         <p className="font-bold text-sm">09 / 10 / 1999</p>
    //       </div>
    //       <div className="grid gap-1 col-span-3">
    //         <Label className="text-sm text-muted-foreground">
    //           Phone number
    //         </Label>
    //         <p className="font-bold text-sm">12345679</p>
    //       </div>
    //     </div>
    //     {/* <div className="flex justify-end order-1 lg:order-last">
    //       <Button className="rounded-full" variant="outline">
    //         Edit
    //       </Button>
    //     </div> */}
    //   </div>

    //   <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 border-b last:border-none py-4">
    //     <div className="w-full col-span-4 lg:col-span-2">
    //       <p className="font-bold">Personal Location</p>
    //       <p className="text-xs font-normal leading-snug text-muted-foreground">
    //         Use a permanent address where you can receive mail.
    //       </p>
    //     </div>
    //     <div className="grid grid-cols-6 gap-2 col-span-4 lg:col-span-3 order-2">
    //       <div className="grid gap-1 col-span-6">
    //         <Label className="text-sm text-muted-foreground">Country</Label>
    //         <p className="font-bold text-sm">Viet Nam</p>
    //       </div>

    //       <div className="grid gap-1 col-span-6">
    //         <Label className="text-sm text-muted-foreground">Adress</Label>
    //         <p className="font-bold text-sm">159 nguyen dinh chieu</p>
    //       </div>
    //       <div className="grid gap-1 grid-cols-6 col-span-6">
    //         <div className="col-span-2">
    //           <Label className="text-sm text-muted-foreground">City</Label>
    //           <p className="font-bold text-sm">Soc Trang</p>
    //         </div>
    //         <div className="col-span-2">
    //           <Label className="text-sm text-muted-foreground">
    //             State / Province
    //           </Label>
    //           <p className="font-bold text-sm">Soc Trang</p>
    //         </div>
    //         <div className="col-span-2">
    //           <Label className="text-sm text-muted-foreground">
    //             ZIP / Postal code
    //           </Label>
    //           <p className="font-bold text-sm">96000</p>
    //         </div>
    //       </div>
    //     </div>
    //     {/* <div className="flex justify-end order-1 lg:order-last">
    //       <Button className="rounded-full" variant="outline">
    //         Edit
    //       </Button>
    //     </div> */}
    //   </div>
    // </div>
  );
};

export default ProfilePage;
