import DatePicker from "@/components/Layouts/components/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CompleteProfilePage = () => {
  return (
    <div className="flex flex-col flex-grow sm:flex-grow-0 sm:grid grid-cols-12 transition-all">
      <div className="flex flex-col flex-grow sm:flex-grow-0 sm:col-start-3 sm:col-end-11 mx-auto w-full sm:max-w-screen-sm p-4">
        <div className="flex flex-col flex-grow space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
            <span>Complete Profile</span>
          </h1>
          <form className="grid grid-cols-6 gap-4">
            <div className="flex flex-col gap-1 col-span-3">
              <label
                htmlFor="firstName"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                First name
              </label>
              <Input type="text" id="firstName" name="firstName" />
            </div>
            <div className="flex flex-col gap-1 col-span-3 ">
              <label
                htmlFor="lastName"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Last name
              </label>
              <Input type="text" id="lastName" name="lastName" />
            </div>
            <div className="flex flex-col gap-1 col-span-4">
              <label htmlFor="phoneNumber">Phone number</label>
              <Input />
            </div>

            <div className="grid gap-1 col-span-6">
              <label htmlFor="birthDate" className="col-span-full">
                Birth of date
              </label>
              <DatePicker yearRange={10} />
            </div>

            <div className="flex flex-col gap-2 col-span-6">
              <label
                htmlFor="r1"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Gender
              </label>
              <RadioGroup
                defaultValue="comfortable"
                className="min-[512px]:grid-cols-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r1" />
                  <Label htmlFor="r1" className="text-sm cursor-pointer">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r2" />
                  <Label htmlFor="r2" className="text-sm cursor-pointer">
                    Female
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3" className="text-sm cursor-pointer">
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
