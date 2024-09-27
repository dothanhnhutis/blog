import { useEffect, useRef } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  callback: (isOutSide: boolean) => void
) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(true);
      } else {
        callback(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};
