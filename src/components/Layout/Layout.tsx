import React, { ReactNode } from "react";
import {
  GlobalDocumentData,
  MenusDocumentData,
} from "../../../prismicio-types";
import { SkipToContent } from "../SkipToContent/SkipToContent";
import { ImageField, PrismicDocument } from "@prismicio/client";
import { AccessibilityMenu } from "../AccessibilityMenu/AccessibilityMenu";
import { TopBanner } from "../TopBanner/TopBanner";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

interface LayoutProps {
  locales: PrismicDocument[];
  menus: MenusDocumentData;
  global: GlobalDocumentData;
  children: ReactNode;
  hideTopFooter?: boolean;
  pageType?: string;
  programLogo?: ImageField;
}

export function Layout({
  locales,
  menus,
  global,
  children
}: LayoutProps) {
  return (
    <>
      <SkipToContent locales={locales} />
      <div className="flex flex-col relative">
        <AccessibilityMenu />
        <TopBanner banner_text={menus.banner_text} locales={locales} />
        <div className="flex flex-col top-0 z-50 sticky">
          <Header
            logo={global.site_logo}
            slices={menus.slices}
            locales={locales}
          />
        </div>
        <main
          id="main-content"
          className="relative focus:outline-0"
          tabIndex={0}
        >
          {children}
        </main>
        <Footer slices={menus.slices1} global={global} />
      </div>
    </>
  );
}
