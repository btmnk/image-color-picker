import React, { DragEvent, useState } from "react";

export interface DropZoneProps {
  onUpload: (file: File) => void;
  onDragEnter?: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: DragEvent<HTMLDivElement>) => void;
  onError?: (error: string) => void;
  className?: string;
}

let draggingCounter = 0;

export const DropZone: React.FC<DropZoneProps> = (props) => {
  const { onUpload, onDragLeave, onDragEnter, onError, className, children } = props;

  const [hasError, setHasError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    draggingCounter++;
    event.preventDefault();
    event.stopPropagation();
    if (!isHovering) {
      setIsHovering(true);
      if (onDragEnter) {
        onDragEnter(event);
      }
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setHasError(false);
    const transferItems = event.dataTransfer.items;
    if (!onError) return;
    if (transferItems.length > 1) {
      onError("Only one file is allowed!");
      setHasError(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    draggingCounter--;
    event.preventDefault();
    event.stopPropagation();
    setHasError(false);
    if (draggingCounter === 0 && isHovering) {
      setIsHovering(false);
      if (onDragLeave) {
        onDragLeave(event);
      }
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (hasError) return;
    event.preventDefault();
    event.stopPropagation();
    const [transferItem] = event.dataTransfer.items;
    if (transferItem.kind !== "file") return;
    const targetFile = transferItem.getAsFile();
    if (!targetFile) return;
    onUpload(targetFile);
  };

  return (
    <div
      className={className}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {children}
    </div>
  );
};
