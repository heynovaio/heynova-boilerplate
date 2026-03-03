import type * as prismic from "@prismicio/client";
/**
 * Converts a hex color code to RGBA format
 * @param hex - Hex color code (e.g., "#ff0000", "#f00", or without #)
 * @param opacity - Opacity value between 0 and 1 (default: 1)
 * @returns RGBA string (e.g., "rgba(255, 0, 0, 0.5)")
 */
export function hexToRgba(
  hex: prismic.ColorField | string,
  opacity: number = 1,
): string {
  if (hex == null) {
    throw new Error("Hex color value cannot be null");
  }

  hex = hex.replace(/^#/, "");

  let r: number, g: number, b: number;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error("Invalid hex color format");
  }

  const clampedOpacity = Math.max(0, Math.min(1, opacity));

  return `rgba(${r}, ${g}, ${b}, ${clampedOpacity})`;
}
