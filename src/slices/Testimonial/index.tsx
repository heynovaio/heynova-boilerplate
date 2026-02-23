"use client";
import { FC, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Testimonial`.
 */
export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

/**
 * Component for "Testimonial" Slices.
 */
import { useMemo } from "react";
import { Container, Section } from "@/components";
import { PrismicNextImage } from "@prismicio/next";

const Testimonial: FC<TestimonialProps> = ({ slice }) => {
  const allTestimonials = slice.primary.testimonial;

  const [randomIndex, setRandomIndex] = useState(() =>
    Array.isArray(allTestimonials) && allTestimonials.length > 0
      ? Math.floor(Math.random() * allTestimonials.length)
      : 0,
  );

  useEffect(() => {
    if (Array.isArray(allTestimonials) && allTestimonials.length > 0) {
      setRandomIndex(Math.floor(Math.random() * allTestimonials.length));
    }
    // Only run when the testimonials array reference changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTestimonials]);

  if (!Array.isArray(allTestimonials) || allTestimonials.length === 0) {
    return <></>;
  }

  const hasImage = Boolean(
    allTestimonials.map((testimonial) => testimonial.image).filter(Boolean)
      .length,
  );

  const displayedTestimonial = allTestimonials[randomIndex];

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling={`bg-background-${slice.primary.background ? slice.primary.background.toLocaleLowerCase() : "bg-background-none"}`}
    >
      <Container containerClassName="flex flex-col gap-12 items-center">
        <div className="testimonial-content relative rounded-[1.25rem] py-4 px-6 md:py-16 md:px-28 overflow-hidden">
          <div
            className={`relative z-10 flex flex-col gap-4 md:gap-12 ${
              hasImage
                ? "md:flex-row md:items-center"
                : "items-center text-center"
            }`}
          >
            {hasImage && (
              <div className="w-full md:w-1/3 aspect-square shrink-0 max-h-60 md:max-h-none">
                <PrismicNextImage
                  field={displayedTestimonial.image}
                  className="w-full h-full object-contain rounded-[1.25rem]"
                  alt=""
                />
              </div>
            )}

            <div
              className={`flex flex-col gap-4 ${
                hasImage ? "" : "items-center max-w-2xl"
              }`}
            >
              <div>
                <span className="text-accent tagline">
                  {slice.primary.subtitle}
                </span>
                <PrismicRichText field={slice.primary.title} />
              </div>
              <PrismicRichText field={displayedTestimonial.quote} />

              <div
                className={`flex flex-col ${hasImage ? "" : "items-center"}`}
              >
                <p className="text-[1.875rem] font-extraBold">
                  {displayedTestimonial.author}
                </p>
                <p className="text-[1.375rem]">
                  {displayedTestimonial.author_title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Testimonial;
