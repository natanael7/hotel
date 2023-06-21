import DescriptionElement from "./Description";
import ImageGrid from "./ImageGrid";
import ResultMeal from "./ResultMeal";
import { capitalize } from "@material-ui/core";
import { ImageInterface } from "../../types";
import { useState } from "react";

interface Props {
  foodname: string;
  description: string;
  setDescription: Function;
  images: ImageInterface[];
  fetchSetItems: Function;
}

const ResultSection = ({
  foodname,
  description,
  setDescription,
  images,
  fetchSetItems,
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
          title={capitalize(foodname)}
          fetchSetItems={fetchSetItems}
        />
      )}
    </div>
  );
};

export default ResultSection;
