import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  Container,
  ContentBox,
  Grid,
  ResponsiveImage,
  Section,
} from "@/components";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `LogoList`.
 */
export type LogoListProps = SliceComponentProps<Content.LogoListSlice>;

/**
 * Component for "LogoList" Slices.
 */
const LogoList: FC<LogoListProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      styling={`bg-background-${(slice.primary.background ?? "default").toLocaleLowerCase()}`}
    >
      <Container containerClassName="flex flex-col gap-6">
        <ContentBox
          tagline={slice.primary.subtitle || ""}
          title={slice.primary.title}
          content={<PrismicRichText field={slice.primary.body} />}
          buttons={slice.primary.buttons.map((item, index) => {
            return (
              <PrismicNextLink
                field={item}
                key={index}
                className={
                  index === 0 ? "btn btn-primary" : "btn btn-secondary"
                }
              />
            );
          })}
        />
        <Grid maxColumns={4}>
          {slice.primary.logo.map(
            (item) =>
              item.link && (
                <PrismicNextLink key={item.name} field={item.link}>
                  <div className="logolist rounded-[10px] flex justify-center items-center text-center p-6 h-full bg-white">
                    {JSON.stringify(item.image) !== "{}" ? (
                      <ResponsiveImage
                        image={item.image}
                        containerClassName="relative w-full flex justify-center items-center aspect-[4/3] overflow-hidden"
                      />
                    ) : (
                      item.name
                    )}
                  </div>
                </PrismicNextLink>
              ),
          )}
        </Grid>
      </Container>
    </Section>
  );
};

export default LogoList;
