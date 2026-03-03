import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ContentBox, Section } from "@/components";
import {
  ContactDocumentData,
  PageDocumentData,
  TeamDocumentData,
} from "../../../prismicio-types";
import { isFilled } from "@prismicio/client";

interface BackgroundImageHeroProps {
  data: PageDocumentData | ContactDocumentData | TeamDocumentData;
}
export const BackgroundImageHero: React.FC<BackgroundImageHeroProps> = ({
  data,
}) => {
  const buttons = data.button?.some((item) => isFilled.link(item))
    ? data.button.map((link, index) =>
        isFilled.link(link) ? (
          <PrismicNextLink
            field={link}
            key={index}
            className={`btn ${index === 0 ? "btn-primary" : "btn-secondary"}`}
          />
        ) : null,
      )
    : undefined;
  return (
    <Section styling="relative min-h-[80vh]">
      {data.image && (
        <PrismicNextImage
          field={data.image}
          className="absolute inset-0 object-cover object-center w-full h-full"
          fallbackAlt=""
          imgixParams={{ auto: ["compress"] }}
        />
      )}
      <div
        className={`inset-0 absolute flex ${data.image ? "bg-(--color-primary-90)" : "bg-background-default"}`}
      >
        <div className="flex flex-col gap-10 justify-center items-center mx-auto max-w-screen-xl sm:w-2/3 md:w-1/2 px-5 text-center">
          <ContentBox
            title={data.title}
            tagline={data.tagline || ""}
            content={<PrismicRichText field={data.body} />}
            buttons={buttons}
          />
        </div>
      </div>
    </Section>
  );
};
