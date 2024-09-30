import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoaderPinwheelIcon, RotateCcwIcon, ZoomInIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import configs from "@/config";
const EditPhoto = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const cropperRef = React.useRef<ReactCropperElement>(null);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Edit Photo</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="lg:max-w-screen-lg max-h-screen overflow-y-scroll">
        <ScrollArea>
          <form className="flex flex-col items-center justify-center gap-3">
            <Cropper
              className="cropper-photo bg-background h-[250px]"
              aspectRatio={1}
              ref={cropperRef}
              dragMode="move"
              cropBoxMovable={false}
              viewMode={1}
              src={configs.NEXT_PUBLIC_PHOTO_URL}
              cropBoxResizable={false}
              center={false}
              zoomOnWheel={false}
              background={false}
              checkOrientation={true}
              guides={false}
              toggleDragModeOnDblclick={false}
            />

            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <ZoomInIcon className="size-4" />
                <p className="text-sm">Zoom</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Slider className="w-[100px]" min={0} max={1} step={0.1} />
              </div>
              <div className="flex items-center justify-center gap-2 text-primary cursor-pointer">
                <RotateCcwIcon className="size-4" />
                <p className="text-sm font-bold">Rotate</p>
              </div>
            </div>

            <p className="max-w-[500px] text-center text-sm font-semibold">
              Must be an actual photo of you. Logos, clip-art, group photos, and
              digitally-altered images are not allowed.
            </p>

            <div className="flex items-center w-full gap-2">
              <Label
                htmlFor="upload-photo"
                className={cn(
                  "w-full text-center cursor-pointer hover:underline text-primary",
                  false ? "opacity-50" : ""
                )}
              >
                Change image
              </Label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                id="upload-photo"
              />
              <Button className="rounded-full w-full">
                {false && (
                  <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0" />
                )}
                Save photo
              </Button>
            </div>
          </form>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditPhoto;
