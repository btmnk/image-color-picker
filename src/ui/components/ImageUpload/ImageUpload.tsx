import classNames from "classnames";
import React, { ChangeEvent } from "react";

import styles from "./ImageUpload.css";

export interface ImageUploadProps {
  onUpload: (file: File) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const { onUpload, className, children } = props;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [targetFile] = event.target.files ?? [];

    if (targetFile) {
      onUpload(targetFile);
    }
  };

  const containerClassNames = classNames(styles.container, className);

  return (
    <label className={containerClassNames}>
      {children}
      <div className={styles.inputContainer}>
        <input type="file" onChange={handleInputChange} />
      </div>
    </label>
  );
};
