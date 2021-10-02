import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useState } from "react";

import { ColorPicker } from "../../components/ColorPicker/ColorPicker";
import { DropZone } from "../../components/ImageUpload/DropZone/DropZone";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";

import styles from "./Landing.css";

export const Landing: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  // const clearImage = () => setImage(null);

  const [isHovering, setIsHovering] = useState(false);
  const handleDragEnter = () => setIsHovering(true);
  const handleDragLeave = () => setIsHovering(false);

  const handleImageUpload = (file: File) => {
    setIsHovering(false);
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

  const containerClassNames = classNames(styles.container, image && styles.withImage, isHovering && styles.hovering);

  return (
    <div className={containerClassNames}>
      <DropZone
        className={styles.dropZone}
        classNameInner={styles.dropZoneInner}
        onUpload={handleImageUpload}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {!image && (
          <ImageUpload onUpload={handleImageUpload} className={styles.imageUpload}>
            <FontAwesomeIcon className={styles.imageUploadIcon} icon="upload" />
            <div className={styles.imageUploadHint}>Click here to choose a file or drag and drop it here</div>
          </ImageUpload>
        )}

        <ColorPicker image={image} />
      </DropZone>
    </div>
  );
};
