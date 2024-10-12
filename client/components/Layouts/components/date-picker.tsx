"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWindowDimensions } from "@/hook/useWindowDimensions";

type DatePickerProps = {
  dateType?: "calendar" | "select";
  autoFlex?: boolean;
  yearRange?: [number, number];
  yearCount?: number;
  isSelectFuture?: boolean;
};

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

const DatePicker = ({
  autoFlex = true,
  isSelectFuture = false,
  dateType,
  yearRange,
  yearCount,
}: DatePickerProps) => {
  if (yearCount && !yearRange) {
    yearRange = [
      new Date().getFullYear() - yearCount,
      new Date().getFullYear(),
    ];
  }

  if (!yearRange) {
    yearRange = [new Date().getFullYear() - 10, new Date().getFullYear()];
  }

  const [type, setType] = React.useState<DatePickerProps["dateType"]>(
    () => dateType || "select"
  );
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const years = React.useMemo(() => {
    const length: number = yearRange[1] - yearRange[0] + 1;
    return Array.from({ length }).map((_, idx) => yearRange[0] + idx);
  }, [yearRange]);

  const { width } = useWindowDimensions();

  React.useEffect(() => {
    if (autoFlex && containerRef.current) {
      console.log(containerRef.current.offsetWidth);
      console.log(
        containerRef.current.offsetWidth <= 400 ? "calendar" : "select"
      );
      setType(containerRef.current.offsetWidth < 400 ? "calendar" : "select");
    }
  }, [autoFlex, width]);

  return (
    <div className="flex items-center gap-2 flex-shrink-0" ref={containerRef}>
      {type == "select" ? (
        <>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Date</SelectLabel>
                {Array.from({ length: 31 }).map((_, idx) => (
                  <SelectItem key={idx} value={`${idx + 1}`}>
                    {idx + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Month</SelectLabel>
                {months.map((month, idx) => (
                  <SelectItem key={idx} value={`${idx + 1}`}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year</SelectLabel>
                {years.map((year) => (
                  <SelectItem value={`${year}`} key={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      ) : (
        <input type="date"></input>
      )}
    </div>
  );
};

export default DatePicker;
