"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { AccessibilityIcon } from "../Icons";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { RadioGroup } from "./AccessibilityRadioGroup";

export const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sizes = [
    { name: "Normal", value: "normal" },
    { name: "Big", value: "bigger" },
    { name: "Biggest", value: "biggest" },
  ];

  const [textSize, setTextSize] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("text-size") || "normal";
    }
    return "normal";
  });

  const [lineHeight, setLineHeight] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("line-height") || "normal";
    }
    return "normal";
  });

  useEffect(() => {
    const themeWrap = document.getElementById("theme-wrap");
    if (themeWrap !== null) {
      const curClass = themeWrap.className;
      const updatedClass = `ts-${textSize} lh-${lineHeight}`;
      if (curClass !== updatedClass) {
        themeWrap.className = `ts-${textSize} lh-${lineHeight}`;
      }
    }
  }, [lineHeight, textSize]);

  function handleTextSize(e: string) {
    localStorage.setItem("text-size", e);
    setTextSize(e);
  }
  function handleLineHeight(e: string) {
    localStorage.setItem("line-height", e);
    setLineHeight(e);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Accessibility Menu"
        className={`fixed origin-bottom-right right-0 z-15 top-60 bg-purple text-white p-5 pb-3 rounded-t-3xl -rotate-90 flex gap-4 hover:text-yellow`}
      >
        <span className="hidden md:block">{"Accessibility"}</span>
        <AccessibilityIcon className="rotate-90" aria-label="Accessibility" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-[#000]/80" />
        <div className="fixed w-full inset-0 flex items-center justify-center md:p-5 overflow-y-auto sm:overflow-hidden">
          <DialogPanel className="w-full max-w-screen-2xl transform rounded-lg px-11 md:px-28 py-14 text-left align-middle shadow-xl transition-all relative bg-gray md:pb-32 sm:mt-0 mt-44">
            <DialogTitle as="h2" className="text-4xl mb-6 md:text-4xl ">
              {"Accessibility Menu"}
            </DialogTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-7 right-5 rounded-full border-2 flex justify-center items-center p-2 w-12 h-12 hover:bg-purple-light"
            >
              <XMarkIcon className="w-10 h-10" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center sm:items-start md:justify-items-stretch accessibility_menu">
              <div className="col-span-2 flex flex-wrap flex-col sm:flex-row gap-10 sm:gap-0 sm:items-center justify-start sm:justify-center md:justify-between">
                {/* Text size */}
                <RadioGroup
                  heading="Text Size"
                  value={textSize}
                  onChange={handleTextSize}
                  options={sizes}
                />
                {/* Line Height */}
                <RadioGroup
                  heading="Line Height"
                  value={lineHeight}
                  onChange={handleLineHeight}
                  options={sizes}
                />
                <button
                  onClick={() => {
                    handleTextSize("normal");
                    handleLineHeight("normal");
                  }}
                  className="underline m-0 mb-10 sm:mt-16 sm:mb-10 md:mb-0 basis-auto order-last hover:text-magenta"
                >
                  {"Reset to Default Settings"}
                </button>
              </div>
              {/* Learn More */}
              <div className="col-span-1 flex flex-col basis-1/3 gap-6 justify-center items-center text-center">
                <h3 className="text-h3 font-title mb-0 sm:text-h2">
                  {"Learn more about accessibility"}
                </h3>
                <a
                  href="/accessibility-statement"
                  className="btn-filled-yellow flex justify-center items-center"
                >
                  {"Learn More"}
                  <ChevronRightIcon className="w-5 h-5" />
                </a>
                <p>
                  {"Are you having difficulty using this site?"}
                  <a href="/contact" className="block underline">
                    {"Contact us"}
                  </a>
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
