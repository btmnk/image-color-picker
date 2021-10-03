import React, { useState } from "react";

import { rgbToHex } from "../../../util/rgbToHex";

import styles from "./ColorPreview.css";

export interface ColorPreviewProps {
  rgb: { red: number; green: number; blue: number } | undefined;
}

export const ColorPreview: React.FC<ColorPreviewProps> = (props) => {
  const { red, green, blue } = props.rgb || { red: 255, green: 255, blue: 255 };

  const [mode, setMode] = useState<"rgb" | "hex">("rgb");
  const toggleMode = () => setMode((current) => (current === "rgb" ? "hex" : "rgb"));

  return (
    <div className={styles.container}>
      <div className={styles.colorBlock} style={{ background: `rgb(${red}, ${green}, ${blue})` }} />
      <div className={styles.code} onClick={toggleMode}>
        {mode === "rgb" ? `${red}, ${green}, ${blue}` : rgbToHex(red, green, blue)}
      </div>
    </div>
  );
};
