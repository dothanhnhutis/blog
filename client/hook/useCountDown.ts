"use client";
import { useEffect, useState } from "react";

const useCountDown = (
  storageKey: string,
  value: string
): [number, () => void] => {
  const [timeAt, setTimeAt] = useState<number>(0);

  useEffect(() => {
    const data = JSON.parse(
      window.localStorage.getItem(storageKey) ?? "{}"
    ) as { [index: string]: number };
    if (data[value] && data[value] > Date.now()) {
      setTimeAt(data[value]);
    } else {
      setTimeAt(0);
    }
  }, [value]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      const data = JSON.parse(
        window.localStorage.getItem(storageKey) ?? "{}"
      ) as { [index: string]: number };
      setTimeAt((prev) =>
        data[value] && data[value] - Date.now() > 0 ? prev - 1000 : 0
      );
    }, 1000);
    return () => clearTimeout(timeId);
  }, [timeAt, value]);

  const setNewTimeAt = (second?: number) => {
    const data = JSON.parse(
      window.localStorage.getItem(storageKey) ?? "{}"
    ) as { [index: string]: number };
    const expireAt = (second || 60) * 1000 + Date.now();
    data[value] = expireAt;
    window.localStorage.setItem(storageKey, JSON.stringify(data));
    setTimeAt(expireAt);
  };

  return [
    typeof window !== "undefined" &&
    JSON.parse(window.localStorage.getItem(storageKey) ?? "{}") &&
    JSON.parse(window.localStorage.getItem(storageKey) ?? "{}")[value] -
      Date.now() >
      0
      ? Math.round(
          (JSON.parse(window.localStorage.getItem(storageKey) ?? "{}")[value] -
            Date.now()) /
            1000
        )
      : 0,
    setNewTimeAt,
  ];
};

export default useCountDown;
