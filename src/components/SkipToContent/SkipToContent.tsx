import { PrismicDocument } from "@prismicio/client";
import Link from "next/link";
import React from "react";

interface SkipToContentProps {
  locales?: PrismicDocument[];
}

export function SkipToContent({ locales }: SkipToContentProps) {
  return (
    <Link
      href="#main-content"
      className="bg-purple skip-content text-white rounded p-2 text-center transition-transform duration-300 transform -translate-y-full -translate-x-1/2 fixed left-1/2 z-100 focus:translate-y-0"
      tabIndex={1}
    >
      {/* TODO: Change Skip to Content text */}
      Skip to Content
    </Link>
  );
}
