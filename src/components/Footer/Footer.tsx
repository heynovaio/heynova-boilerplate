import React from "react";
import {
  GlobalDocumentData,
  MenusDocumentData,
  MenusDocumentDataSlices1Slice,
} from "../../../prismicio-types";
import { ResponsiveImage } from "../Image/ResponsiveImage";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { PrismicNextLink } from "@prismicio/next";
import { FaLinkedin } from "react-icons/fa";
import { isFilled } from "@prismicio/client";

interface FooterProps {
  global?: GlobalDocumentData;
  footerData?: MenusDocumentData;
  slices: MenusDocumentDataSlices1Slice[] | undefined;
}

export const Footer = ({ global, slices, footerData }: FooterProps) => {
  return (
    <footer className=" text-white flex flex-col justify-center items-center">
      <nav className="py-14 px-5  mx-auto max-w-screen-xl w-full flex flex-col">
        <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-between gap-x-8 gap-y-12 w-full text-center md:text-left social-links">
          <div className="flex flex-col items-center lg:items-start">
            <ResponsiveImage
              field={global?.site_logo}
              containerClassName="mb-8 max-w-[180px] md:max-w-[220px] logo"
            />
            <div className="flex flex-col items-center md:items-start">
              <h4 className="mb-6 footer-header">Follow Us</h4>
              <div className="flex  flex-col justify-center items-center md:items-start gap-6 ">
                {isFilled.link(global?.facebook) && (
                  <span className="flex flex-row gap-4 items-center">
                    <FaInstagram size={35} />
                    <PrismicNextLink
                      field={global?.instagram}
                      className="text-base underline-offset-4 menu-link hover:underline"
                    />
                  </span>
                )}
                {isFilled.link(global?.facebook) && (
                  <span className="flex flex-row gap-4 items-center">
                    <FaFacebook size={35} />
                    <PrismicNextLink
                      field={global?.facebook}
                      className="text-base underline-offset-4 menu-link hover:underline"
                    />
                  </span>
                )}
                {isFilled.link(global?.linkedin) && (
                  <span className="flex flex-row gap-4 items-center">
                    <FaLinkedin size={35} />
                    <PrismicNextLink
                      field={global?.linkedin}
                      className="text-base underline-offset-4 menu-link hover:underline"
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
          <SliceZone slices={slices} components={components} />
          <div className="flex flex-col gap-4">
            <h4 className="footer-header">Contact Us</h4>
            <a className={"hover:underline"} href={`mailto:${global?.email}`}>
              {global?.email}
            </a>
          </div>
        </div>
      </nav>
      <div className="flex flex-col justify-center items-center mt-6 footer-links mb-6">
        <p className="mt-6 text-center text-button">
          {footerData?.copyright}
        </p>
      </div>
    </footer>
  );
};
