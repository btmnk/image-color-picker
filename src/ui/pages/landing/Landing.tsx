import React, { useState } from "react";

import { ColorPicker } from "../../components/ColorPicker/ColorPicker";
import { UploadArea } from "./UploadArea/UploadArea";

import styles from "./Landing.css";

export const Landing: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  // const clearImage = () => setImage(null);

  const handleImageUpload = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (readEvent) => {
      const targetResultUrl = readEvent.target?.result?.toString();

      if (!targetResultUrl) {
        throw Error("Could not read file...");
      }

      const newImage = new Image();
      newImage.src = targetResultUrl;
      newImage.onload = () => {
        setImage(newImage);
      };
    };
  };

  return (
    <div className={styles.container}>
      {image && <ColorPicker image={image} />}
      <UploadArea onUpload={handleImageUpload} />
    </div>
  );
};
