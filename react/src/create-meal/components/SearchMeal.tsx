import { useState, FC } from "react";
import generateDescription from "../misc/generateDescription";
import generateImages from "../misc/generateImages";
import { ImageInterface } from "../../types";
import SearchElement from "./SearchElement";
import Loader from "./Loader";
import ResultSection from "./ResultSection";

interface PropsInterface {
  fetchSetItems: Function;
}

const SearchMeal: FC<PropsInterface> = ({ fetchSetItems }) => {
  const [foodname, setFoodname] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleButtonClick = async () => {
    setShowResult(true);
    setIsLoading(true);

    const newDescription = await generateDescription(foodname);
    setDescription(newDescription);

    const newImages = await generateImages(foodname);
    setImages(newImages);

    setIsLoading(false);
  };

  return (
    <>
      <SearchElement
        foodname={foodname}
        setFoodname={setFoodname}
        handleButtonClick={handleButtonClick}
      />
      {showResult &&
        (isLoading ? (
          <Loader />
        ) : (
          <ResultSection
            foodname={foodname}
            description={description}
            setDescription={setDescription}
            images={images}
            fetchSetItems={fetchSetItems}
          />
        ))}
    </>
  );
};

export default SearchMeal;
