import { FontSizeMode, fontSizes } from "./constants";

export const changeGlobalFontSize = (mode: FontSizeMode) => {
  const newFontSize = fontSizes[mode];
  document.documentElement.style.setProperty("font-size", newFontSize);
};
