import React, { useRef } from "react";

export const Landing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [targetFile] = event.target.files ?? [];
    const canvas = canvasRef.current;

    if (targetFile && canvas) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(targetFile);
      fileReader.onloadend = (readEvent) => {
        const newImage = new Image();
        const targetResultUrl = readEvent.target?.result?.toString();

        if (!targetResultUrl) {
          throw Error("Could not read file...");
        }

        newImage.src = targetResultUrl;
        newImage.onload = (imageLoadEvent) => {
          const canvasContext = canvas.getContext("2d");
          if (!canvasContext) return;

          canvas.width = newImage.width;
          canvas.height = newImage.height;
          canvasContext.drawImage(newImage, 0, 0);
        };
      };
    }
  };

  return (
    <div>
      <h1>Upload an image!</h1>

      <div>
        <input type="file" onChange={handleImageUpload} />
      </div>

      <div>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
