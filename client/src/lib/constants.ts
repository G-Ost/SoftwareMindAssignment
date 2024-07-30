export enum FontSizeMode {
  NORMAL,
  LARGE,
}

export const fontSizes: { [key in FontSizeMode]: string } = {
  [FontSizeMode.NORMAL]: "16px",
  [FontSizeMode.LARGE]: "32px",
};

export const fontSizePropertyName = "--base-font-size";
