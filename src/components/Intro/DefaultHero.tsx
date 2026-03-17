"use client";

import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { Container, ContentBox, ResponsiveImage, Section } from "@/components";
import { isFilled } from "@prismicio/client";
import {
  ContactDocumentData,
  PageDocumentData,
  TeamDocumentData,
} from "../../../prismicio-types";

interface DefaultHeroProps {
  data: PageDocumentData | ContactDocumentData | TeamDocumentData;
}

export const DefaultHero: React.FC<DefaultHeroProps> = ({ data }) => {
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
    <Section styling={`bg-background-${data.background.toLocaleLowerCase()}`}>
      <Container
        containerClassName={`flex flex-col gap-4 md:gap-16 w-full items-center md:flex-row-reverse`}
      >
        <div className="w-full md:w-1/2">
          <ResponsiveImage
            image={data.image}
            className={`w-full h-62.5 md:h-100 object-cover mb-4 md:mb-0 rounded-image`}
          />
        </div>

        <div className="w-full md:w-1/2">
          <ContentBox
            title={data.title}
            tagline={data.tagline || ""}
            content={<PrismicRichText field={data.body} />}
            buttons={buttons}
          />
        </div>
      </Container>
    </Section>
  );
};
