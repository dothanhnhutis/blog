"use client";
import DatePicker from "@/components/date-picker";
import Tag from "@/components/tag";
import Tiptap from "@/components/tiptap/tiptap";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import configs from "@/config";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronDownIcon,
  HashIcon,
  ImageIcon,
  TagsIcon,
  UserPlusIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { DayPicker } from "react-day-picker";

type PostData = {
  title: string;
  slug: string;
  tags: string[];
  category: string;
  status: "draft" | "private" | "not-public" | "public";
  shareWithEmail: string[];
  publishAt: Date;
  authorId: string;
};

type PostFormType =
  | { type: "create" }
  | {
      type: "edit";
      data: PostData;
    };

const categoriesDataTemplate = [
  { id: "1", name: "Làm đẹp", slug: "lam-dep" },
  { id: "2", name: "Dưỡng da", slug: "duong-da" },
  { id: "3", name: "Chăm Sóc Body", slug: "cham-soc-body" },
];
const usersDataTemplate = [
  { id: "1", name: "example1", email: "abc@example.com" },
  { id: "2", name: "example2", email: "aaa@example.com" },
  { id: "3", name: "example3", email: "bbb@example.com" },
];

const tagDataTemplate = [
  { id: "1asdasad", name: "Làm đẹp" },
  { id: "2cxcxcaa", name: "Chăm sóc da" },
  { id: "3ccxcasd", name: "Chăm sóc tóc" },
  { id: "4ccxcasd", name: "Mỹ Phẩm" },
  { id: "5ccxcasd", name: "Skin care" },
  { id: "6ccxcasd", name: "Cách Chọn Đơn Vị Gia Công Nước Tẩy Trang" },
  { id: "7ccxcasd", name: " làm lotion" },
];

const PostForm = (props: PostFormType) => {
  const [tab, setTab] = React.useState<"content" | "metadata" | "display-mode">(
    "content"
  );
  const [formData, setFormData] = React.useState<PostData>({
    title: "",
    slug: "",
    tags: [],
    category: "",
    status: "draft",
    shareWithEmail: [],
    publishAt: new Date(),
    authorId: "",
  });
  const [tag, setTag] = React.useState<string>("");

  const [isSchedule, setIsSchedule] = React.useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter" || e.code == "NumpadEnter" || e.code == "Tab") {
      setFormData((prev) => ({
        ...prev,
        tags: tag.trim().length > 0 ? [...prev.tags, tag] : prev.tags,
      }));
      setTag("");
      return;
    }
  };

  const tagsNoSelected = React.useMemo(() => {
    return tagDataTemplate.filter(
      (t) =>
        t.name.toLowerCase().includes(tag.toLowerCase()) &&
        !formData.tags.includes(t.name)
    );
  }, [tagDataTemplate, tag]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-10 flex flex-grow gap-2">
        <div>content</div>
        <div>metadata</div>
        <div>display mode</div>
      </div>
      {tab == "content" ? (
        <div className="grid gap-2 w-full grid-cols-2">
          <div className="col-span-2 order-first">
            <Label htmlFor="thumnail" className="text-sm text-muted-foreground">
              Thumnail
            </Label>
            <div className="border-dashed border-2 rounded-lg hover:border-primary flex items-center justify-center p-[100px]">
              <div className="w-[200px] h-[100px] flex flex-col items-center justify-center text-center">
                <ImageIcon className="shrink-0 size-10" />
                <p className="text-sm">
                  Drop your images here, or select{" "}
                  <label
                    htmlFor="upload"
                    className="text-primary cursor-pointer"
                  >
                    click to browse
                  </label>
                </p>
                <input type="file" id="upload" className="hidden" />
              </div>
            </div>
            <div className="relative h-[400px] bg-secondary">
              <Image
                fill
                alt="thumnail"
                src={configs.NEXT_PUBLIC_COVER_PHOTO_URL}
                className="aspect-[4/3] object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // width={440}
                // height={440}
              />
            </div>
          </div>
          <div className="col-span-2 order-1">
            <Label htmlFor="title" className="text-sm text-muted-foreground">
              Title
            </Label>
            <Input
              value={formData.title}
              onChange={handleOnChange}
              id="title"
              name="title"
              className="focus-visible:ring-transparent "
              placeholder="Name of your project"
            />
          </div>
          <div className="col-span-2 lg:col-span-1 order-2">
            <Label htmlFor="slug" className="text-sm text-muted-foreground">
              Slug
            </Label>
            <Input
              value={formData.slug}
              onChange={handleOnChange}
              id="slug"
              name="slug"
              className="focus-visible:ring-transparent "
              placeholder="Slug"
            />
          </div>
          <div className="col-span-2 lg:col-span-1 order-3">
            <Label htmlFor="slug" className="text-sm text-muted-foreground">
              Category
            </Label>
            <Select>
              <SelectTrigger className="focus-visible:ring-transparent focus:ring-transparent text-start h-10">
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent id="tags">
                {categoriesDataTemplate.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex flex-col">
                      <p>{category.name}</p>
                      {/* <p className="text-xs">{category.slug}</p> */}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 lg:col-span-1 order-4 lg:order-5">
            <Label htmlFor="tag" className="text-sm text-muted-foreground">
              Tag
            </Label>
            <div className="relative border p-2 rounded-lg min-h-[58px]">
              <div className="flex gap-2 flex-wrap items-center">
                {formData.tags.map((tag, idx) => (
                  <Tag
                    key={idx}
                    title={tag}
                    onRemove={() => {
                      setFormData((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((_, idx1) => idx1 != idx),
                      }));
                    }}
                  />
                ))}

                {formData.tags.length >= 3 && (
                  <Tag
                    className="bg-destructive cursor-pointer"
                    title={"Remove All"}
                    onRemove={() =>
                      setFormData((prev) => ({
                        ...prev,
                        tags: [],
                      }))
                    }
                  />
                )}
                <input
                  className="bg-transparent outline-0 text-sm"
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="Type tag..."
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div
                className={cn(
                  "bg-background shadow z-50 rounded dark:border absolute mt-1 top-full left-0 w-full  max-h-[200px] overflow-y-auto overflow-x-hidden p-1",
                  tagsNoSelected.length > 0 && tag.length > 0
                    ? "grid"
                    : "hidden"
                )}
              >
                {tagsNoSelected.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setTag("");
                      setFormData((prev) => ({
                        ...prev,
                        tags: [...prev.tags, t.name],
                      }));
                    }}
                    className="flex gap-2 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-secondary"
                  >
                    <HashIcon className="shrink-0 size-4" />
                    <p>{t.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 order-5 lg:order-4">
            <Label htmlFor="slug" className="text-sm text-muted-foreground">
              Author
            </Label>
            <Select
            // disabled={isPending}
            // onValueChange={(v) => {
            //   if (v !== "")
            //     setForm((prev) => {
            //       return { ...prev, authorId: v };
            //     });
            // }}
            // value={form.authorId}
            >
              <SelectTrigger className="focus-visible:ring-transparent focus:ring-transparent text-start h-auto">
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent id="users">
                <div>
                  {usersDataTemplate.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      <div className="flex items-center gap-2 ">
                        <Avatar>
                          <AvatarImage
                            src={configs.NEXT_PUBLIC_PHOTO_URL}
                            alt="avatar"
                            className="z-[1]"
                          />
                          <Skeleton className="h-12 w-12 rounded-full" />
                        </Avatar>
                        <div className="w-full overflow-hidden">
                          <p className="truncate">{u.name}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>

            {/* <div className="flex items-center gap-2 border p-2 px-3 rounded-lg">
              <Avatar>
                <AvatarImage
                  src={configs.NEXT_PUBLIC_PHOTO_URL}
                  alt="avatar"
                  className="z-[1]"
                />
                <Skeleton className="h-12 w-12 rounded-full" />
              </Avatar>
              <div className="w-full overflow-hidden h-10">
                <p className="truncate">Thanh Nhut</p>
                <p className="text-xs text-muted-foreground truncate">
                  gaconght@gmail.com
                </p>
              </div>
            </div> */}
          </div>
          <div className="col-span-2 order-last">
            <Label className="text-sm text-muted-foreground">Content</Label>
            <Tiptap />
          </div>
        </div>
      ) : tab == "metadata" ? (
        <div className="grid grid-cols-1 gap-2">
          <h3 className="font-bold text-xl">Metadata</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          <h3 className="font-bold text-xl">Display Mode</h3>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Choose when you publish and who can see your post
          </p>

          <div className="grid gap-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">Save or Publish</h4>
                <p className="text-xs font-normal leading-snug text-muted-foreground">
                  Make your post <b>public</b>, <b>no public</b>, or{" "}
                  <b>private</b>
                </p>
              </div>

              {isSchedule && (
                <ChevronDownIcon
                  onClick={() => setIsSchedule(false)}
                  className="shrink-0 size-12 p-2  hover:bg-secondary rounded-full"
                />
              )}
            </div>

            {!isSchedule && (
              <div className="grid gap-2 ml-6">
                <div>
                  <div className="flex items-center gap-2 ">
                    <button
                      id="private"
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, status: "private" }));
                      }}
                      className="inline border-foreground border-2 rounded-full p-[3px] cursor-pointer "
                    >
                      <div
                        data-selected={formData.status == "private"}
                        className="rounded-full size-2.5 bg-transparent data-[selected=true]:bg-foreground"
                      />
                    </button>
                    <label htmlFor="private" className="cursor-pointer">
                      Private
                    </label>
                  </div>
                  <p className="ml-8 text-xs font-normal leading-snug text-muted-foreground">
                    Only you and the people you choose can see your posts
                  </p>
                  <button
                    data-selected={formData.status == "private"}
                    type="button"
                    className="bg-secondary rounded-full px-3 py-2  items-center gap-2 mt-2 ml-8 hidden data-[selected=true]:flex"
                  >
                    <UserPlusIcon className="shrink-0 size-5" />
                    <p>Share privately</p>
                  </button>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      id="not-public"
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          status: "not-public",
                        }));
                      }}
                      className="inline border-foreground border-2 rounded-full p-[3px] cursor-pointer "
                    >
                      <div
                        data-selected={formData.status == "not-public"}
                        className="rounded-full size-2.5 bg-transparent data-[selected=true]:bg-foreground"
                      />
                    </button>
                    <label htmlFor="not-public" className="cursor-pointer">
                      No Public
                    </label>
                  </div>
                  <p className="ml-8 text-xs font-normal leading-snug text-muted-foreground">
                    Anyone with a link to the post can view the post
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      id="public"
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          status: "public",
                        }));
                      }}
                      className="inline border-foreground border-2 rounded-full p-[3px] cursor-pointer "
                    >
                      <div
                        data-selected={formData.status == "public"}
                        className="rounded-full size-2.5 bg-transparent data-[selected=true]:bg-foreground"
                      />
                    </button>
                    <label htmlFor="public" className="cursor-pointer">
                      Public
                    </label>
                  </div>
                  <p className="ml-8 text-xs font-normal leading-snug text-muted-foreground">
                    Everyone can see your posts
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-2 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">Schedule</h4>
                <p className="text-xs font-normal leading-snug text-muted-foreground">
                  Select a date to switch your post to <b>public</b> mode.
                </p>
              </div>
              {!isSchedule && (
                <ChevronDownIcon
                  onClick={() => setIsSchedule(true)}
                  className="shrink-0 size-12 p-2  hover:bg-secondary rounded-full"
                />
              )}
            </div>
            {isSchedule && (
              <>
                <p className="text-sm">
                  Set a schedule to switch to public mode
                </p>
                <DatePicker
                  // disabled={(post && isPast(new Date(post.publishAt))) || isPending}
                  // defaultDate={new Date(form.publishAt)}
                  onSubmit={(date) => {
                    // setForm((prev) => ({
                    //   ...prev,
                    //   publishAt: date.toISOString(),
                    // }));
                  }}
                />
                <p className="text-xs font-normal leading-snug text-muted-foreground">
                  The video will be <b>private</b> before publishing
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {/* <div className="flex justify-end items-center gap-2 mt-4">
        {tab != "content" && (
          <Button
            variant="secondary"
            onClick={() =>
              setTab(tab == "display-mode" ? "metadata" : "content")
            }
          >
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            if (tab == "content") {
              setTab("metadata");
            }
            if (tab == "metadata") {
              setTab("display-mode");
            }
          }}
        >
          Next/Save/Publish/schedule
        </Button>
      </div> */}
    </form>
  );
};

export default PostForm;
