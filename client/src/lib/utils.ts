import { FontSizeMode, fontSizes } from "./constants";
import fetch from "unfetch";
import { HttpError } from "./types";

export const changeGlobalFontSize = (mode: FontSizeMode) => {
  const newFontSize = fontSizes[mode];
  document.documentElement.style.setProperty("font-size", newFontSize);
};

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const { error: errorMessage } = await res.json();
    const error: HttpError = {
      message: errorMessage,
      status: res.status,
      name: "fetchig error",
    };
    throw error;
  }

  return res.json();
};

export const getDisplayValue = (value: string | undefined) => {
  if (!value || value.length === 0) {
    return "-";
  }
  return value;
};
