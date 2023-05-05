import DescriptionElement from "./Description";
import ImageGrid from "./ImageGrid";
import ResultMeal from "./ResultMeal";
import { capitalize } from "@material-ui/core";
import { ImageInterface } from "../../types";
import { useState } from "react";

interface Props {
  dishname: string;
  description: string;
  setDescription: Function;
  images: ImageInterface[];
}

const ResultSection = ({
  dishname,
  description,
  setDescription,
  images,
}: Props) => {
  const [selectedImageSrc, setSelectedImageSrc] = useState("");

  return (
    <div className="result">
      <DescriptionElement
        description={description}
        setDescription={setDescription}
      />
      <ImageGrid images={images} setSrc={setSelectedImageSrc} />

      {selectedImageSrc !== "" && (
        <ResultMeal
          description={description}
          image={selectedImageSrc}
          title={capitalize(dishname)}
        />
      )}
    </div>
  );
};

export default ResultSection;
