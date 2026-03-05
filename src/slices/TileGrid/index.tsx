import { FC } from "react";
import { Content, ImageField, RichTextField } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { StandardCard } from "@/components/Cards/StandardCard";
import { Container, Section } from "@/components";
import { Grid } from "@/components";
import { ContentBox } from "@/components";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
/**
 * Props for `TileGrid`.
 */
export type TileGridProps = SliceComponentProps<Content.TileGridSlice>;

/**
 * Component for "TileGrid" Slices.
 */
const TileGrid: FC<TileGridProps> = ({ slice }) => {
  const numColumns = slice.primary.columns;

  const cards = (slice.primary.tile || []).map((tile) => ({
    title: tile.title as RichTextField,
    body: tile.body as RichTextField,
    image: tile.image as ImageField,
    button: Array.isArray(tile.button) ? tile.button[0] : tile.button,
  }));

  const selectedImageStyle = slice.primary.image_style;
  const imageStyle =
    selectedImageStyle === "Full Width"
      ? "fullWidth"
      : selectedImageStyle === "Icon"
        ? "iconCentered"
        : "contained";

  const buttons = slice.primary.buttons?.some((button) => isFilled.link(button))
    ? slice.primary.buttons.map((link, index) =>
        isFilled.link(link) ? (
          <PrismicNextLink
            field={link}
            key={index}
            className="btn btn-primary"
          />
        ) : null,
      )
    : undefined;

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ContentBox
        title={slice.primary.title}
        tagline={slice.primary.subtitle || ""}
        content={<PrismicRichText field={slice.primary.body} />}
        buttons={buttons}
      />
      <Container>
        <div className="mt-10">
          <Grid maxColumns={numColumns}>
            {cards.map((card, index) => (
              <StandardCard
                key={index}
                title={card.title}
                description={card.body}
                image={card.image}
                button={card.button}
                cardBgColorClass="bg-primary"
                borderColorClass="border-red"
                imageStyle={imageStyle}
              />
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  );
};

export default TileGrid;
