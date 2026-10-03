import { useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    let localVal;
    try {
      localVal = JSON.parse(window.localStorage.getItem(key));
    } catch {
      localVal = null;
    }
    if (localVal === null) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } else {
      return localVal;
    }
  });

  const setLocalStorage = (newValue) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setLocalStorage];
}
