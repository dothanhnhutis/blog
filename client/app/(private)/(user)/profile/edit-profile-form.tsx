import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, GripVerticalIcon, SaveIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Profile = {
  bio: string;
  urls: { id: number; url: string }[];
  firstName: string;
  lastName: string;
  birhtDate: Date;
  phone: string;
  address: string;
  postalCode: string;
  country: string;
  region: string;
  city: string;
};

const SortUrl = ({ data }: { data: { url: string; id: number } }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 py-2 px-3 border rounded-md h-10 bg-background"
    >
      <GripVerticalIcon
        className="flex-shrink-0 size-4 cursor-grab"
        {...listeners}
        {...attributes}
      />
      <p className="text-sm text-muted-foreground w-full">{data.url}</p>
      <XIcon className="flex-shrink-0 size-4 cursor-pointer" />
    </div>
  );
};

const EditProfileForm = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<Profile>({
    bio: "",
    urls: [
      { id: 1, url: "https://example1.xyz" },
      { id: 2, url: "https://example2.xyz" },
      { id: 3, url: "https://example3.xyz" },
    ],
    firstName: "",
    lastName: "",
    birhtDate: new Date(),
    phone: "",
    address: "",
    postalCode: "",
    country: "",
    region: "",
    city: "",
  });
  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getUrlPos = (id: UniqueIdentifier) =>
    formData.urls.findIndex((url) => id === url.id);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    console.log(active, over);
    if (active.id === over?.id) return;
    setFormData((prev) => {
      const originalPos = getUrlPos(active.id);
      const newPos = getUrlPos(over!.id);
      return { ...prev, urls: arrayMove(formData.urls, originalPos, newPos) };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSave = () => {};
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="lg:max-w-screen-lg max-h-screen overflow-y-scroll">
        <div className="flex justify-between">
          <div>
            <p className="font-bold">Your profile</p>
            <p className="text-xs font-normal leading-snug text-muted-foreground">
              Last edit on <strong>12 February 2024</strong>
            </p>
          </div>
          <div className="gap-4 flex items-center">
            <Button onClick={handleClose} variant="outline" className="p-2">
              <XIcon className="flex-shrink-0 size-4 sm:hidden" />
              <span className="hidden sm:inline">Discard</span>
            </Button>
            <Button size="sm" onClick={handleSave}>
              <SaveIcon className="flex-shrink-0 size-4 sm:mr-2 sm:hidden" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>

        <p className="font-bold">Personal Information</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label
              htmlFor="firstName"
              className="text-sm text-muted-foreground"
            >
              First name
            </Label>
            <Input
              value={formData.firstName}
              onChange={handleOnchange}
              name="firstName"
              id="firstName"
              placeholder="First name"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="lastName" className="text-sm text-muted-foreground">
              Last name
            </Label>
            <Input
              value={formData.lastName}
              onChange={handleOnchange}
              id="lastName"
              name="lastName"
              placeholder="Last name"
            />
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
                    !formData.birhtDate && "text-muted-foreground"
                  )}
                >
                  {formData.birhtDate ? (
                    format(formData.birhtDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.birhtDate}
                  onSelect={(v) => {
                    console.log(v);
                    setFormData((prev) => ({
                      ...prev,
                      birhtDate: v || new Date(),
                    }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="phone" className="text-sm text-muted-foreground">
              Phone number
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleOnchange}
            />
          </div>
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="bio" className="text-sm text-muted-foreground">
              Bio
            </Label>
            <Textarea
              value={formData.bio}
              onChange={handleOnchange}
              name="bio"
              id="bio"
              placeholder="Type your message here."
              maxLength={256}
            />
            <div className="flex justify-between">
              <p className="text-xs text-muted-foreground">
                Write a few sentences about yourself.
              </p>
              <p className="text-xs text-muted-foreground">
                {formData.bio.length}/256
              </p>
            </div>
          </div>
          <div className="grid gap-1 col-span-2">
            <Label className="text-sm text-muted-foreground">URLs</Label>
            <p className="text-xs font-normal text-muted-foreground">
              Add links to your website, blog, or social media profiles.
            </p>
            {/* <div className="flex items-center py-2 px-3 border rounded-md h-10">
              <input
                type="text"
                className="bg-transparent w-full outline-0 text-sm"
              />
              <GripVerticalIcon className="flex-shrink-0 size-4" />
            </div> */}

            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <SortableContext
                items={formData.urls}
                strategy={verticalListSortingStrategy}
              >
                {formData.urls.map((url) => (
                  <SortUrl key={url.id} data={url} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
        <p className="font-bold">Personal Location</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="address" className="text-sm text-muted-foreground">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleOnchange}
            />
          </div>
          <div className="grid gap-1 col-span-2 sm:col-span-1">
            <Label htmlFor="country" className="text-sm text-muted-foreground">
              Country
            </Label>
            <Input
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleOnchange}
            />
          </div>
          <div className="grid gap-1 col-span-2 sm:col-span-1">
            <Label htmlFor="city" className="text-sm text-muted-foreground">
              City
            </Label>
            <Input
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleOnchange}
            />
          </div>
          <div className="grid gap-1 col-span-2 sm:col-span-1">
            <Label htmlFor="region" className="text-sm text-muted-foreground">
              State / Province
            </Label>
            <Input
              id="region"
              name="region"
              placeholder="State / Province"
              value={formData.region}
              onChange={handleOnchange}
            />
          </div>
          <div className="grid gap-1 col-span-2 sm:col-span-1">
            <Label
              htmlFor="postalCode"
              className="text-sm text-muted-foreground"
            >
              ZIP / Postal code
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              placeholder="ZIP / Postal code"
              value={formData.postalCode}
              onChange={handleOnchange}
            />
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditProfileForm;
