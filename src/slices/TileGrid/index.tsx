import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { StandardCard } from "@/components/Cards/StandardCard";
import { Container } from "@/components";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `TileGrid`.
 */
export type TileGridProps = SliceComponentProps<Content.TileGridSlice>;

/**
 * Component for "TileGrid" Slices.
 */
const TileGrid: FC<TileGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 md:gap-16">
          {slice.primary.tile?.map((item, index) => (
            <div key={index} className={`w-full `}>
              <StandardCard
                title={item.title}
                description={item.body}
                // button={item.button}
                image={item.image}
                noBackground={true}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TileGrid;
