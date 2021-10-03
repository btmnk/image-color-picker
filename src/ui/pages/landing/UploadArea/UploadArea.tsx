import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useState } from "react";

import { DropZone } from "../../../components/ImageUpload/DropZone/DropZone";
import { ImageUpload } from "../../../components/ImageUpload/ImageUpload";

import styles from "./UploadArea.css";

export interface UploadAreaProps {
  onUpload: (file: File) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = (props) => {
  const { onUpload } = props;

  const [isHovering, setIsHovering] = useState(false);
  const handleDragEnter = () => setIsHovering(true);
  const handleDragLeave = () => setIsHovering(false);
  const handleUpload = (file: File) => {
    onUpload(file);
    setIsHovering(false);
  };

  const containerClassNames = classNames(styles.container, isHovering && styles.hovering);

  return (
    <DropZone
      className={containerClassNames}
      onUpload={handleUpload}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <ImageUpload onUpload={onUpload} className={styles.imageUpload}>
        <FontAwesomeIcon className={styles.imageUploadIcon} icon="upload" />
        <div className={styles.imageUploadHint}>Click here to choose a file or drag and drop it here</div>
      </ImageUpload>
    </DropZone>
  );
};
