import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FilterIcon, XIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const FilterPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 border px-2 py-1 rounded-md hover:bg-secondary">
          <FilterIcon className="size-4 flex-shrink-0" />
          <span className="text-sm hidden md:inline">Filter</span>
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" side="bottom" className="rounded-xl p-0">
        <div className="flex items-center justify-between py-2 px-3 border-b">
          <div className="flex items-center gap-2">
            <FilterIcon className="size-4 flex-shrink-0" />
            <p className="text-sm">Filter</p>
          </div>
          <XIcon className="flex-shrink-0 size-4" />
        </div>

        <div className="border-b py-2 px-1">
          <Label className="px-2">Verified</Label>
          <RadioGroup defaultValue="comfortable" className="gap-0">
            <Label
              htmlFor="r1"
              className="flex items-center gap-2 hover:bg-primary/60 p-2 py-3 rounded"
            >
              <RadioGroupItem value="comfortable" id="r1" />
              <p>A-Z</p>
            </Label>
            <Label
              htmlFor="r2"
              className="flex items-center gap-2 hover:bg-primary/60 p-2 py-3 rounded"
            >
              <RadioGroupItem value="comfortable" id="r2" />
              <p>Z-A</p>
            </Label>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between py-2 px-3 border-t">
          <Button variant="secondary" size="sm">
            Reset
          </Button>
          <Button size="sm">Apply now</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
