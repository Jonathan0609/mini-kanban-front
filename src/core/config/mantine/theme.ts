"use client";

import {
  createTheme,
  darken,
  defaultVariantColorsResolver,
  parseThemeColor,
  rgba,
  type VariantColorsResolver,
} from "@mantine/core";

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (
    parsedColor.isThemeColor &&
    parsedColor.color === "lime" &&
    input.variant === "filled"
  ) {
    return {
      ...defaultResolvedColors,
      color: "var(--mantine-color-black)",
      hoverColor: "var(--mantine-color-black)",
    };
  }

  if (input.variant === "light") {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `1px solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  if (input.variant === "danger") {
    return {
      background: "var(--mantine-color-red-9)",
      hover: "var(--mantine-color-red-8)",
      color: "var(--mantine-color-white)",
      border: "none",
    };
  }

  return defaultResolvedColors;
};

export const mantineTheme = createTheme({
  fontFamily: "'Chakra Petch', sans-serif",
  variantColorResolver,
});
