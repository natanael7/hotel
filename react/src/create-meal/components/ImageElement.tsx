import { ImageInterface } from "../../types";
import { useState } from "react";

interface Props {
  image: ImageInterface;
  isSelected: boolean;
  handleClick: (src: string) => void;
}

const Image: React.FC<Props> = ({ image, isSelected, handleClick }) => {
  const { src, fallback } = image;
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    setImageSrc(fallback);
  };

  return (
    <img
      className={`grid__item ${isSelected ? "selected" : ""}`}
      src={imageSrc}
      onError={handleImageError}
      onClick={() => handleClick(imageSrc)}
    />
  );
};

export default Image;
