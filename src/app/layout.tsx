import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from "@/prismicio";

import "./globals.css";
import React from "react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();

  const theme = await client.getSingle("colors");

  // Colors
  const primary = theme.data.primary;
  const secondary = theme.data.secondary;
  const highlight = theme.data.highlight;
  const complimentary = theme.data.complimentary;
  const black = theme.data.black;
  const white = theme.data.white;
  const hyperlink = theme.data.hyperlink;
  const hover = theme.data.hover;
  const focus = theme.data.focus;

  // Brand Settings
  const base_constrast_mode = theme.data.base_contrast_mode;
  const radius_scale = theme.data.radius_scale;
  const shadow_style = theme.data.shadow_style;

  return (
    <html lang="en">
      <body
        style={
          {
            "--color-primary": primary,
            "--color-secondary": secondary,
            "--color-highlight": highlight,
            "--color-complimentary": complimentary,
            "--color-black": black,
            "--color-white": white,
            "--color-hyperlink": hyperlink,
            "--color-hover": hover,
            "--color-focus": focus,
            "--radius-scale": radius_scale,
            "--shadow-style": shadow_style,
            "--base-contrast-mode": base_constrast_mode,
          } as React.CSSProperties
        }
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
