import {
  ImageField,
  isFilled,
  KeyTextField,
  LinkField,
  RichTextField,
} from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { ResponsiveImage } from "../Image/ResponsiveImage";
import { IoPersonOutline } from "react-icons/io5";

interface StandardCardProps {
  title: RichTextField | KeyTextField | string;
  subtitle?: KeyTextField | string;
  description?: RichTextField | KeyTextField | string;
  button?: LinkField;
  image?: ImageField;

  textAlignment?: "left" | "center" | "right";
  imageStyle?: "fullWidth" | "contained" | "iconCentered" | "iconLeft";
  radiusClass?: string;
  shadowClass?: string;

  borderColorClass?: string;
  cardBgColorClass?: string;
  titleTextClassName?: string;
}

// TODO: figure out should i pull  radius style and shadow from global here *******

{
  /**
    TODO:

    - add buttons
    
    */
}

export const StandardCard = ({
  title,
  description,
  subtitle,
  image,
  imageStyle = "contained",
  textAlignment = "left",
  borderColorClass = "border-white",
  cardBgColorClass = "",
  radiusClass = "rounded-[1.25rem]",
  shadowClass = "",
}: StandardCardProps) => {
  const hasImage = isFilled.image(image);

  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[textAlignment];

  const renderTitle = () => {
    if (!title) return null;
    if (Array.isArray(title)) {
      return <PrismicRichText field={title} />;
    }
    return <h3>{title}</h3>;
  };

  const renderDescription = () => {
    if (!description) return null;
    if (Array.isArray(description)) {
      return <PrismicRichText field={description} />;
    }
    return <p>{description}</p>;
  };

  const renderSubtitle = () => {
    if (!subtitle) return null;
    return <p>{subtitle}</p>;
  };

  const renderImage = () => {
    if (!image || !("url" in image) || !image.url) {
      return null;
    }

    if (imageStyle === "contained") {
      return (
        <div className="w-full flex items-center justify-center pb-6">
          <ResponsiveImage
            image={image}
            className="object-contain max-h-64 w-auto"
          />
        </div>
      );
    }

    if (imageStyle === "iconLeft" || imageStyle === "iconCentered") {
      return (
        <div
          className={`w-full flex items-center ${imageStyle === "iconCentered" ? "justify-center" : "justify-start"} pb-6`}
        >
          <ResponsiveImage
            image={image}
            className="object-contain max-h-20 w-auto"
          />
        </div>
      );
    }

    return (
      <div className="relative -mx-8 -mt-8 mb-4 ">
        <ResponsiveImage
          image={image}
          className="w-full h-full object-cover rounded-none"
        />
      </div>
    );
  };

  return (
    <div
      className={`border ${borderColorClass} ${cardBgColorClass} ${radiusClass} ${shadowClass} p-6 w-full overflow-hidden h-full flex flex-col`}
    >
      {hasImage && renderImage()}

      <div
        className={`
        flex flex-col w-full
        ${
          !hasImage
            ? "flex-1 justify-center items-center text-center"
            : alignmentClass
        }
      `}
      >
        {renderSubtitle()}
        {renderTitle()}
        {renderDescription()}
      </div>
    </div>
  );
};
