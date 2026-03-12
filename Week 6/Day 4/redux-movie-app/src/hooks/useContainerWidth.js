import { useLayoutEffect, useRef, useState } from "react";

export function useContainerWidth(minWidth = 320) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(minWidth);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect?.width;
      if (next) {
        setWidth(next);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { containerRef, width };
}