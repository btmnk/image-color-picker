import React from "react";

import { Header } from "../components/Header/Header";

import styles from "./BaseLayout.css";

export const BaseLayout: React.FC = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
