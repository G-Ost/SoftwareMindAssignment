import { FontSizeMode, fontSizes } from "./constants";
import fetch from "unfetch";

export const changeGlobalFontSize = (mode: FontSizeMode) => {
  const newFontSize = fontSizes[mode];
  document.documentElement.style.setProperty("font-size", newFontSize);
};

export const fetcher = (url: string) =>
  fetch(url).then((response) => response.json());

export const getTableValue = (value: string | undefined) => {
  if (!value || value.length === 0) {
    return "-";
  }
  return value;
};
