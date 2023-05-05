import { useState } from "react";
import generateDescription from "../misc/generateDescription";
import generateImages from "../misc/generateImages";
import { ImageInterface } from "../../types";
import SearchElement from "./SearchElement";
import Loader from "./Loader";
import ResultSection from "./ResultSection";

export default function SearchMeal() {
  const [dishname, setDishname] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleButtonClick = async () => {
    setShowResult(true);
    setIsLoading(true);

    const newDescription = await generateDescription(dishname);
    setDescription(newDescription);

    const newImages = await generateImages(dishname);
    setImages(newImages);

    setIsLoading(false);
  };

  return (
    <>
      <SearchElement
        dishname={dishname}
        setDishname={setDishname}
        handleButtonClick={handleButtonClick}
      />
      {showResult &&
        (isLoading ? (
          <Loader />
        ) : (
          <ResultSection
            dishname={dishname}
            description={description}
            setDescription={setDescription}
            images={images}
          />
        ))}
    </>
  );
}
