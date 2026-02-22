"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { RichTextField, KeyTextField, ImageField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { ReactNode } from "react";
import { FaChevronUp } from "react-icons/fa";
import { ResponsiveImage } from "../ResponsiveImage/ResponsiveImage";

interface VerticalAccordionProps {
  title: string | KeyTextField | RichTextField;
  content: RichTextField;
  image?: ImageField;
  bgColorClass?: string;
  textColorClass?: string;
  button?: ReactNode;
  boldTitle?: boolean;
}

export const VerticalAccordion: React.FC<VerticalAccordionProps> = ({
  title,
  content,
  image,
  button,
  boldTitle = true,
}) => {
  return (
    <section
      className={`w-full accordion font-primary my-4 rounded-[5px] accordion-content antialiased`}
    >
      <Disclosure>
        {({ open }) => (
          <div>
            <DisclosureButton className="print-reveal flex flex-row justify-between items-center p-4 w-full text-h3 rounded-[5px] print:p-2 print:font-bold ">
              <div className="flex items-center text-left gap-4">
                {image && <ResponsiveImage image={image} />}
                <div
                  className={`text-lg text-left accordion-header ${boldTitle ? "font-bold" : "font-normal"}`}
                >
                  {typeof title === "string" ? (
                    title
                  ) : (
                    <PrismicRichText field={title} />
                  )}
                </div>
              </div>
              <span
                className={`text transform transition-transform ${open ? "" : "rotate-180"}`}
              >
                <FaChevronUp className="h-4 w-4" />
              </span>
            </DisclosureButton>
            <DisclosurePanel
              transition
              unmount={false}
              className={`print-reveal p-4 print:p-1 print:m-0 transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0`}
            >
              <PrismicRichText field={content} />
              {button && <div className="my-4">{button}</div>}
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    </section>
  );
};
