import React from "react";

import styles from "./Header.css";

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Image Color Picker</div>
    </div>
  );
};
