import { useSyncExternalStore } from "react";

export function useInnerWidth() {
  //@ts-ignore
  const width = useSyncExternalStore(subscribe, () => window.innerWidth);
  return width;
}

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
}
