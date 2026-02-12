"use client";

import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicDocument, RichTextField } from "@prismicio/client";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";

interface TopBannerProps {
  banner_text: RichTextField;
  locales: PrismicDocument[];
}

export const TopBanner: React.FC<TopBannerProps> = ({
  banner_text,
  locales,
}) => {
  return (
    <div className="top-banner flex items-center justify-center text-center md:justify-between p-3 lg:px-14 px-5">
      <div className="md:block hidden"></div>
      <PrismicRichText
        field={banner_text}
        components={{
          hyperlink: ({ node, children }) => {
            const url = node.data.url;
            return (
              <a className="underline" href={url}>
                {children}
              </a>
            );
          },
        }}
      />
      <div className="md:block hidden">
        <LanguageSwitcher locales={locales} />
      </div>
    </div>
  );
};
