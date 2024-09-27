import { addSeconds, differenceInMilliseconds, startOfSecond } from "date-fns";
import React from "react";

function msUntilNext() {
  const date = new Date();
  return differenceInMilliseconds(addSeconds(startOfSecond(date), 1), date);
}

export default function useDateTime() {
  const [date, setDate] = React.useState(startOfSecond(new Date()));
  const timer = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    function delayedTimeChange() {
      timer.current = setTimeout(() => {
        delayedTimeChange();
      }, msUntilNext());

      setDate(startOfSecond(new Date()));
    }

    delayedTimeChange();
    return () => clearTimeout(timer.current);
  }, []);

  return date;
}
