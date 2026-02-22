"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `SingleLink`.
 */
export type SingleLinkProps = SliceComponentProps<Content.SingleLinkSlice>;

/**
 * Component for "SingleLink" Slices.
 */
const SingleLink = ({ slice }: SingleLinkProps): JSX.Element => {
  const iconOnly = slice.primary.link.text === "" && slice.primary.icon;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-test-id={slice.slice_type}
      className="flex w-full menu-link single-links"
    >
      <PrismicNextLink
        field={slice.primary.link}
        className="text-[1.75rem] xs:text-[1.75rem] sm:text-[1.75rem] md:text-[1.25rem] in-data-[menu=hamburger]:md:text-[1.75rem] flex w-full gap-2 rounded-full text-nowrap justify-between no-underline py-4 px-0 text-left"
      >
        <div className="w-3 h-3"></div>
        {slice.primary.icon && (
          <PrismicNextImage
            field={slice.primary.icon}
            className={iconOnly ? "w-5 h-5" : "w-3 h-3"}
            alt=""
          />
        )}
        {slice.primary.link.text}
        <div className="w-3 h-3"></div>
      </PrismicNextLink>
    </section>
  );
};

export default SingleLink;
