import React from "react";

import styles from "./BaseLayout.css";

export const BaseLayout: React.FC = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Header</div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
