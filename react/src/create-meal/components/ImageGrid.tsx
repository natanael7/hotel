import { useState } from "react";
import ImageElement from "./ImageElement";
import { ImageInterface } from "../../types";

interface Props {
  images: ImageInterface[];
  setSrc: Function;
}

const ImageGrid: React.FC<Props> = ({ images, setSrc }) => {
  const [selectedImage, setSelectedImage] = useState<ImageInterface | null>(
    null
  );

  const handleImageClick = (image: ImageInterface, src: string) => {
    setSelectedImage(image);
    setSrc(src);
  };

  return (
    <>
      <div id="images" className="grid">
        {images.map((image, index) => (
          <ImageElement
            key={index}
            image={image}
            isSelected={selectedImage === image}
            handleClick={(src) => handleImageClick(image, src)}
          />
        ))}
      </div>
    </>
  );
};

export default ImageGrid;
