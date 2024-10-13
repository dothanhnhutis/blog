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
import { endOfMonth, isExists } from "date-fns";

type DatePicker = {
  day: number;
  month: number;
  year: number;
};

type DatePickerProps = {
  yearRange: number | [number, number];
  onSelect?: (date: Date) => void;
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

const DatePicker = ({ yearRange, onSelect }: DatePickerProps) => {
  const years = React.useMemo(() => {
    if (Array.isArray(yearRange)) {
      if (yearRange[0] > yearRange[1]) throw new Error("range error");
    } else {
      if (yearRange <= 0) throw new Error("number error");
    }
    const length: number = Array.isArray(yearRange)
      ? yearRange[1] - yearRange[0] + 1
      : yearRange;
    const yearCurr: number = new Date().getFullYear() - length + 1;
    return Array.from({ length }).map(
      (_, idx) => (Array.isArray(yearRange) ? yearRange[0] : yearCurr) + idx
    );
  }, [yearRange]);

  const [date, setDate] = React.useState<DatePicker>({
    day: 1,
    month: 0,
    year: years.reverse()[0],
  });

  const handleSelect = (where: "day" | "month" | "year", value: string) => {
    const maxDayOfMonth: number = endOfMonth(
      new Date(
        where == "year" ? parseInt(value) : date.year,
        where == "month" ? parseInt(value) : date.month
      )
    ).getDate();
    if (where == "year") {
      setDate((prev) => ({
        ...prev,
        day: maxDayOfMonth <= date.day ? maxDayOfMonth : date.day,
        year: parseInt(value),
      }));
    } else if (where == "month") {
      setDate((prev) => ({
        ...prev,
        day: maxDayOfMonth <= date.day ? maxDayOfMonth : date.day,
        month: parseInt(value),
      }));
    } else {
      setDate({ ...date, [where]: parseInt(value) });
    }
    if (onSelect) {
      onSelect(new Date(date.year, date.month, date.day));
    }
  };

  return (
    <div className="flex items-center gap-2 flex-shrink-0 ">
      <Select
        value={`${date.day}`}
        onValueChange={(v) => handleSelect("day", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Date</SelectLabel>
            {Array.from({ length: 31 }).map((_, idx) => (
              <SelectItem
                key={idx}
                value={`${idx + 1}`}
                disabled={
                  !!date.year &&
                  !!date.month &&
                  !isExists(date.year, date.month, idx + 1)
                }
              >
                {idx + 1}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={`${date.month}`}
        onValueChange={(v) => handleSelect("month", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Month</SelectLabel>
            {months.map((month, idx) => (
              <SelectItem key={idx} value={`${idx}`}>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={`${date.year}`}
        onValueChange={(v) => handleSelect("year", v)}
      >
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
    </div>
  );
};

export default DatePicker;
