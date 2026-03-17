"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import React from "react";
import Image from "next/image";
import {
  ImageField,
  isFilled,
  KeyTextField,
  LinkField,
  RichTextField,
} from "@prismicio/client";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { useState } from "react";

interface HorizontalAccordionProps {
  titles: KeyTextField[];
  contents: RichTextField[];
  images?: (ImageField<never> | null)[];
  buttons?: LinkField[];
  backgroundClass: string;
}

export const HorizontalAccordion: React.FC<HorizontalAccordionProps> = ({
  titles,
  contents,
  images = [],
  buttons = [],
  backgroundClass,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log("Background class:", backgroundClass);
  return (
    <>
      <div className="hidden test md:block mt-4 md:mt-8">
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="flex gap-10">
            <TabList className="w-1/2 flex flex-col h-full flex-1">
              {titles.map((title, idx) => {
                return (
                  // Tabs themselves
                  <div key={idx}>
                    {(idx === 0 && selectedIndex !== idx) ||
                    (idx > 0 &&
                      selectedIndex !== idx &&
                      selectedIndex !== idx - 1) ? (
                      <div className={`h-[.5px] focus ${backgroundClass}`} />
                    ) : null}

                    <Tab
                      className={`hover:cursor-pointer focus w-full rounded-default px-6 py-10 flex flex-row justify-between items-center font-bold transition-all duration-300 outline-none ${
                        idx === selectedIndex
                          ? backgroundClass
                          : "bg-background-none"
                      }`}
                    >
                      <h4>{title}</h4>
                      <FaChevronRight className="h-5 w-5 accordion-arrow" />
                    </Tab>

                    {(idx === titles.length - 1 && selectedIndex !== idx) ||
                    (idx < titles.length - 1 &&
                      selectedIndex !== idx &&
                      selectedIndex !== idx + 1) ? (
                      <div className="h-px" />
                    ) : null}
                  </div>
                );
              })}
            </TabList>

            <TabPanels className="accordion-panel w-1/2 p-0.5 rounded-[10px] flex-1 min-h-100">
              <div className="w-full h-full">
                {titles.map((_, idx) => (
                  // Card
                  <TabPanel
                    key={`panel-${idx}`}
                    className={`h-full focus rounded-default ${backgroundClass}`}
                  >
                    <div className="h-full w-full py-10">
                      <div className="h-full flex items-center justify-start">
                        <div className="text-center px-8 w-full max-w-2xl flex flex-col items-center">
                          {images[idx]?.url && (
                            <Image
                              src={images[idx].url}
                              alt={images[idx].alt || `Image ${idx}`}
                              width={100}
                              height={100}
                              className="mb-6 max-h-25 p-3 object-contain block"
                              style={{ maxHeight: "100px" }}
                            />
                          )}

                          <div className="mb-2 self-center font-semibold text-center">
                            <h3 className="text-4xl text-center">
                              {titles[idx]}
                            </h3>
                          </div>

                          <div className="text-base mt-5 space-y-4 self-center">
                            <PrismicRichText field={contents[idx]} />
                          </div>

                          {isFilled.link(buttons[idx]) && (
                            <PrismicNextLink
                              className="btn btn-primary mt-4"
                              field={buttons[idx]}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                ))}
              </div>
            </TabPanels>
          </div>
        </TabGroup>
      </div>
      {/* Mobile version */}
      <div className="block md:hidden">
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="flex flex-col gap-6">
            {titles.map((title, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 rounded-default                   
                  ${
                    index === selectedIndex
                      ? backgroundClass
                      : "bg-background-none"
                  }`}
              >
                {(index === 0 && selectedIndex !== index) ||
                (index > 0 &&
                  selectedIndex !== index &&
                  selectedIndex !== index - 1) ? (
                  <div className={`h-[.5px] focus ${backgroundClass}`} />
                ) : null}
                <Tab
                  className={() =>
                    `px-6 py-7 rounded-default flex justify-between font-bold transition-all duration-300 outline-none`
                  }
                >
                  <div className="flex items-center justify-between w-full ">
                    <h4>{title}</h4>
                    <FaChevronDown className={`h-4 w-4 accordion-arrow`} />
                  </div>
                </Tab>

                <TabPanel className="min-h-100 py-10 rounded-default">
                  <div
                    className={`h-full flex items-center justify-center rounded-default ${backgroundClass}`}
                  >
                    <div className="text-center px-8 w-full max-w-2xl mx-auto flex flex-col items-center">
                      {images[index]?.url && (
                        <Image
                          src={images[index].url}
                          alt={images[index].alt || `Image ${index}`}
                          width={100}
                          height={100}
                          className="mb-6 max-h-20 object-contain block mx-auto"
                          style={{ maxHeight: "80px" }}
                        />
                      )}
                      <div className="mb-2 flex items-center font-semibold">
                        <h3 className="text-4xl text-center">
                          {titles[index]}
                        </h3>
                      </div>

                      <div className="text-base mt-5 space-y-4">
                        <PrismicRichText field={contents[index]} />
                      </div>

                      {isFilled.link(buttons[index]) && (
                        <PrismicNextLink
                          className="btn btn-primary mt-4"
                          field={buttons[index]}
                        />
                      )}
                    </div>
                  </div>
                </TabPanel>
              </div>
            ))}
          </div>
        </TabGroup>
      </div>
    </>
  );
};
