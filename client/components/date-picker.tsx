"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { vi } from "date-fns/locale";
import {
  format,
  setHours,
  setMinutes,
  setYear,
  setMonth,
  setDate,
  isEqual,
  subDays,
  isFuture,
  addHours,
  getMinutes,
  getHours,
  addMinutes,
  startOfMinute,
  differenceInSeconds,
} from "date-fns";
import { Separator } from "./ui/separator";
import useDateTime from "@/hook/useDateTime";

export const getNow = () => {
  return startOfMinute(new Date());
};

type DatePickerProps = {
  onSubmit: (date: Date) => void;
  defaultDate?: Date;
  isSelectPast?: boolean;
  disabled?: boolean;
};

const DatePicker = ({
  onSubmit,
  isSelectPast = false,
  defaultDate = addHours(getNow(), 3),
  disabled = false,
}: DatePickerProps) => {
  const date = useDateTime();
  const [open, setOpen] = React.useState<boolean>(false);
  const [pickDate, setPickDate] = React.useState<Date>(defaultDate);
  const [tempdate, setTempDate] = React.useState<Date>(new Date());

  const [openDate, setOpenDate] = React.useState<boolean>(true);
  const hourRef = React.useRef<HTMLDivElement>(null);
  const minuteRef = React.useRef<HTMLDivElement>(null);

  const handleOnchangeHour = (h: number) => {
    if (!isSelectPast && !isFuture(setHours(tempdate, h))) {
      setTempDate(
        setMinutes(setHours(tempdate, h), getMinutes(Date.now()) + 1)
      );
    } else {
      setTempDate(setHours(tempdate, h));
    }
  };

  const handleOnchangeMinute = (m: number) => {
    if (isSelectPast || isFuture(setMinutes(tempdate, m))) {
      setTempDate(setMinutes(tempdate, m));
    }
  };

  const handleReset = () => {
    setOpenDate(true);
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit(tempdate);
    setPickDate(tempdate);
    handleReset();
  };

  React.useEffect(() => {
    if (
      !openDate &&
      hourRef.current?.scrollTop == 0 &&
      minuteRef.current?.scrollTop == 0
    ) {
      hourRef.current?.scrollTo({
        behavior: "instant",
        top: 40 * tempdate.getHours(),
        left: 0,
      });
      minuteRef.current?.scrollTo({
        behavior: "instant",
        top: 40 * tempdate.getMinutes(),
        left: 0,
      });
    }
  }, [openDate, tempdate]);

  React.useEffect(() => {
    hourRef.current?.scrollTo({
      behavior: "smooth",
      top: 40 * tempdate.getHours(),
      left: 0,
    });
    minuteRef.current?.scrollTo({
      behavior: "smooth",
      top: 40 * tempdate.getMinutes(),
      left: 0,
    });
  }, [tempdate]);

  React.useEffect(() => {
    if (!isSelectPast && differenceInSeconds(tempdate, date) <= 0) {
      setTempDate(addMinutes(startOfMinute(date), 1));
    }
  }, [date, tempdate, isSelectPast]);

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleReset();
        }
        if (!isEqual(tempdate, pickDate)) {
          setTempDate(pickDate);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          onClick={() => setOpen(true)}
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !tempdate && "text-muted-foreground"
          )}
        >
          {tempdate ? (
            `${
              open
                ? format(tempdate, "dd/MM/yyyy HH:mm (z)")
                : format(pickDate, "dd/MM/yyyy HH:mm (z)")
            }`
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        {openDate ? (
          <Calendar
            mode="single"
            locale={vi}
            defaultMonth={tempdate}
            fixedWeeks
            selected={tempdate}
            onDayClick={(date) => {
              const newDate = setYear(
                setMonth(setDate(tempdate, date.getDate()), date.getMonth()),
                date.getFullYear()
              );
              setTempDate(newDate);
            }}
            disabled={(date) =>
              !isSelectPast &&
              (date < subDays(getNow(), 1) || date < new Date("1900-01-01"))
            }
            initialFocus
          />
        ) : (
          <div className="text-center">
            <p className="px-3 py-3 text-sm font-medium">Chọn thời gian</p>
            <Separator />
            <div className="px-3">
              <div className="flex items-center justify-between relative h-[280px] w-[224px] overflow-hidden">
                <div
                  className="w-full h-full overflow-y-scroll scrollbar-hidden after:content-[''] after:block after:h-[264px] "
                  ref={hourRef}
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        if (
                          isSelectPast ||
                          isFuture(setHours(tempdate, i).setMinutes(58))
                        )
                          handleOnchangeHour(i);
                      }}
                      className={cn(
                        "leading-8 font-medium rounded-tl-md rounded-bl-md py-1",
                        tempdate.getHours() == i
                          ? "text-primary bg-primary/20 cursor-pointer"
                          : isSelectPast ||
                            isFuture(setHours(tempdate, i).setMinutes(58))
                          ? "hover:bg-accent cursor-pointer"
                          : "text-accent cursor-no-drop"
                      )}
                    >
                      {i < 10 ? "0" + i : i}
                    </div>
                  ))}
                </div>
                <Separator orientation="vertical" />
                <div
                  ref={minuteRef}
                  className="w-full h-full overflow-y-scroll scrollbar-hidden after:content-[''] after:block after:h-[264px] "
                >
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div
                      onClick={() => {
                        if (isSelectPast || isFuture(setMinutes(tempdate, i)))
                          handleOnchangeMinute(i);
                      }}
                      key={i}
                      className={cn(
                        "leading-8 font-medium rounded-tr-md rounded-br-md py-1",
                        tempdate.getMinutes() == i
                          ? "text-primary bg-primary/20 cursor-pointer"
                          : isSelectPast || isFuture(setMinutes(tempdate, i))
                          ? "hover:bg-accent cursor-pointer"
                          : "text-accent cursor-no-drop"
                      )}
                    >
                      {i < 10 ? "0" + i : i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <Separator />
        <div className="flex justify-end gap-2 p-2">
          <Button
            onClick={() => setOpenDate(!openDate)}
            size="sm"
            variant="outline"
            type="button"
          >
            {openDate ? (
              <span className="text-xs">Chọn thời gian</span>
            ) : (
              <span className="text-xs">Chọn ngày</span>
            )}
          </Button>
          <Button
            size="sm"
            className="p-3"
            type="button"
            onClick={handleSubmit}
          >
            <span className="text-xs">OK</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
