import { FC } from "react";
import { Content, ImageField, RichTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { StandardCard } from "@/components/Cards/StandardCard";
import { Container, Section } from "@/components";
import { Grid } from "@/components";

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
    // image_style: tile.image_style || false,
  }));

  const selectedImageStyle = slice.primary.image_style;
  const imageStyle =
    selectedImageStyle === "Full Width"
      ? "fullWidth"
      : selectedImageStyle === "Icon"
        ? "iconCentered"
        : "contained";
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        {/* <ContentGrid
          cards={cards}
          numCols={numColumns}
          title={slice.primary.title}
          body={slice.primary.body}
        /> */}
        <Grid maxColumns={numColumns}>
          {cards.map((card, index) => (
            <StandardCard
              key={index}
              title={card.title}
              description={card.body}
              image={card.image}
              // imageStyle={card.image_style || false}
              button={card.button}
              cardBgColorClass="bg-primary"
              borderColorClass="border-red"
              imageStyle={imageStyle}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default TileGrid;
