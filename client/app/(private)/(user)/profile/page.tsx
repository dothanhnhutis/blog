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
  MapPinIcon,
  PenSquareIcon,
  SmartphoneIcon,
} from "lucide-react";
import configs from "@/config";
import EditProfileForm from "./edit-profile-form";
import EditPhoto from "./edit-avatar-form";

const ProfilePage = () => {
  const { currentUser } = useAuthContext();

  return (
    <div className="w-full p-4 bg-white shadow m-2 rounded-lg">
      <EditProfileForm />
      <EditPhoto />
      <h3 className="text-3xl font-bold">Profile</h3>
      <p className="text-xs font-normal leading-snug text-muted-foreground">
        This information will be displayed publicly
      </p>

      <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 border-b last:border-none py-4">
        <div className="w-full col-span-4 lg:col-span-2">
          <p className="font-bold">Media</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            This information will be displayed publicly
          </p>
        </div>
        <div className="grid grid-cols-6 gap-4 col-span-5 lg:col-span-3 order-2">
          <div className="grid gap-1 col-span-6">
            <Label className="text-sm text-muted-foreground">Photo</Label>
            <div className="flex gap-2 flex-wrap items-center">
              <Avatar className="size-14">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={
                    currentUser?.profile?.picture ||
                    configs.NEXT_PUBLIC_PHOTO_URL
                  }
                />
                <AvatarFallback className="bg-transparent">
                  <Skeleton className="size-20 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <Button variant="outline">Change picture</Button>
            </div>
          </div>
          {/* <div className="grid gap-1 col-span-6">
            <Label className="text-sm text-muted-foreground">Cover photo</Label>
            <div className="flex gap-2 flex-wrap items-center justify-center p-4 border-2 border-dashed rounded-xl w-full h-[200px]">
              <div className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
                <FaImage className="size-14 flex-shrink-0" />
                <p>Upload a file or drag and drop</p>
                <p>PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div> */}
          <div className="grid gap-1 col-span-6">
            <Label className="text-sm text-muted-foreground">Bio</Label>
            <Textarea placeholder="Type your message here." maxLength={256} />
            <div className="flex justify-between">
              <p className="text-xs text-muted-foreground">
                Write a few sentences about yourself.
              </p>
              <p className="text-xs text-muted-foreground">0/256</p>
            </div>
          </div>
          <div className="grid gap-1 col-span-6">
            <Label className="text-sm text-muted-foreground">URLs</Label>
            <p className="text-xs font-normal text-muted-foreground">
              Add links to your website, blog, or social media profiles.
            </p>
            <div className="flex gap-2 items-center">
              <FaFacebookSquare className="flex-shrink-0 size-6 text-primary " />
              <p className="text-xs font-normal text-muted-foreground">
                https://facebooke.com/dothanhnhutis
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <IoLogoYoutube className="flex-shrink-0 size-6 text-destructive" />
              <p className="text-xs font-normal text-muted-foreground">
                https://facebooke.com/dothanhnhutis
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <FaTiktok className="flex-shrink-0 size-5 p-0.5 bg-black text-white rounded" />
              <p className="text-xs font-normal text-muted-foreground">
                https://facebooke.com/dothanhnhutis
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end order-1 lg:order-last">
          <Button className="rounded-full" variant="outline">
            Edit
          </Button>
        </div> */}
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 border-b last:border-none py-4">
        <div className="w-full col-span-4 lg:col-span-2">
          <p className="font-bold">Personal Information</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="grid grid-cols-6 gap-2 col-span-4 lg:col-span-3 order-2">
          <div className="grid gap-1 col-span-3">
            <Label className="text-sm text-muted-foreground">First name</Label>
            <p className="font-bold text-sm">Nhut</p>
          </div>
          <div className="grid gap-1 col-span-3">
            <Label className="text-sm text-muted-foreground">Last name</Label>
            <p className="font-bold text-sm">Thanh</p>
          </div>
          <div className="grid gap-1 col-span-3">
            <Label className="text-sm text-muted-foreground">
              Date of birth
            </Label>
            <p className="font-bold text-sm">09 / 10 / 1999</p>
          </div>
          <div className="grid gap-1 col-span-3">
            <Label className="text-sm text-muted-foreground">
              Phone number
            </Label>
            <p className="font-bold text-sm">12345679</p>
          </div>
        </div>
        {/* <div className="flex justify-end order-1 lg:order-last">
          <Button className="rounded-full" variant="outline">
            Edit
          </Button>
        </div> */}
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 border-b last:border-none py-4">
        <div className="w-full col-span-4 lg:col-span-2">
          <p className="font-bold">Personal Location</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="grid grid-cols-6 gap-2 col-span-4 lg:col-span-3 order-2">
          <div className="grid gap-1 col-span-6">
            <Label className="text-sm text-muted-foreground">Country</Label>
            <p className="font-bold text-sm">Viet Nam</p>
          </div>

          <div className="grid gap-1 col-span-6">
            <Label className="text-sm text-muted-foreground">Adress</Label>
            <p className="font-bold text-sm">159 nguyen dinh chieu</p>
          </div>
          <div className="grid gap-1 grid-cols-6 col-span-6">
            <div className="col-span-2">
              <Label className="text-sm text-muted-foreground">City</Label>
              <p className="font-bold text-sm">Soc Trang</p>
            </div>
            <div className="col-span-2">
              <Label className="text-sm text-muted-foreground">
                State / Province
              </Label>
              <p className="font-bold text-sm">Soc Trang</p>
            </div>
            <div className="col-span-2">
              <Label className="text-sm text-muted-foreground">
                ZIP / Postal code
              </Label>
              <p className="font-bold text-sm">96000</p>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end order-1 lg:order-last">
          <Button className="rounded-full" variant="outline">
            Edit
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
