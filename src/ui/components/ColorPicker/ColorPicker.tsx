import React, { useEffect, useRef, useState } from "react";

import styles from "./ColorPicker.css";

export interface ColorPickerProps {
  image: HTMLImageElement | null;
}

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { image } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [color, setColor] = useState<string | undefined>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContainerRect = canvasContainerRef.current?.getBoundingClientRect();

    if (canvas && canvasContainerRect) {
      const canvasContext = canvas.getContext("2d");
      if (!canvasContext) return;

      if (image) {
        canvas.height = image.height;
        canvas.width = canvasContainerRect.width;
        canvasContext.drawImage(image, 0, 0);

        const imageData = canvasContext.getImageData(5, 5, 1, 1);
        const [red, green, blue] = imageData.data;
        setColor(`${red},${green},${blue}`);

        canvasContext.strokeStyle = "0x000000";
        canvasContext.strokeRect(0, 0, canvas.width, canvas.height);
      } else {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [image]);

  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer} ref={canvasContainerRef}>
        <canvas ref={canvasRef} />
      </div>

      {image && <div className={styles.colorPreview}>First Color: {color}</div>}
    </div>
  );
};
