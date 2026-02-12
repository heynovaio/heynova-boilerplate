"use client";

import { components } from "@/slices";
import {
  Popover,
  PopoverButton,
  Transition,
  PopoverPanel,
} from "@headlessui/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import React, { Fragment, useEffect, useState } from "react";
import {
  GlobalDocumentData,
  MenusDocumentData,
  MenusDocumentDataSlicesSlice,
} from "../../../prismicio-types";
import { ImageField, PrismicDocument } from "@prismicio/client";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";

interface HeaderProps {
  logo: ImageField;
  slices: MenusDocumentDataSlicesSlice[];
  menus?: MenusDocumentData;
  locales: PrismicDocument[];
  global?: GlobalDocumentData;
}

export const Header: React.FC<HeaderProps> = ({
  // menus,
  logo,
  slices,
  locales,
  global,
}) => {

  return (
    <header
      className="sticky top-0 z-50 header"
    >
      <nav
        aria-label="Main Nav"
        className="flex items-center px-5 py-3 gap-3 justify-between"
      >
        <PrismicNextLink
          className="flex max-w-45 md:max-w-55 max-h-26 object-cover"
          aria-label="homepage link"
          prefetch={true}
          href={`/`}
        >
          <PrismicNextImage
            field={logo}
            fallbackAlt=""
            className="md:px-5 py-5 px-0"
          />
        </PrismicNextLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center xl:gap-10 gap-3 z-50 flex-1 justify-center">
          <SliceZone slices={slices} components={components} />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Popover className="relative">
            {({ open }) => (
              <>
                <PopoverButton
                  className="inline-flex justify-center w-full p-2 relative group"
                  aria-label="Main Menu"
                >
                  <div className="flex flex-col justify-center items-center w-8 h-8">
                    <span
                      className={`block absolute h-0.5 w-8 gradient-light-full transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
                    ></span>
                    <span
                      className={`block absolute h-0.5 w-8 gradient-light-full transform transition duration-300 ease-in-out ${open ? "opacity-0" : "opacity-100"}`}
                    ></span>
                    <span
                      className={`block absolute h-0.5 w-8 gradient-light-full transform transition duration-300 ease-in-out ${open ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
                    ></span>
                  </div>
                </PopoverButton>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 translate-x-full"
                  enterTo="transform opacity-100 translate-x-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 translate-x-0"
                  leaveTo="transform opacity-0 translate-x-full"
                >
                  <PopoverPanel
                    anchor="bottom"
                    className="w-screen h-screen bg-midnight bg-gradient-dark lg:mt-4 pb-10 z-40"
                  >
                    <div
                      data-menu="hamburger"
                      className="flex flex-col px-6 my-10 items-center justify-center w-full"
                    >
                      <SliceZone slices={slices} components={components} />
                    </div>
                    {locales && locales.length > 1 && (
                      <LanguageSwitcher
                        locales={locales}
                        classname="bottom-0 fixed right-0"
                      />
                    )}
                  </PopoverPanel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </nav>
    </header>
  );
};
