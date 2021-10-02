import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import { BaseLayout } from "./layout/BaseLayout";
import { Landing } from "./pages/landing/Landing";

import "./Theme.css";

library.add(faUpload);

export const App: React.FC = () => {
  return (
    <BaseLayout>
      <Landing />
    </BaseLayout>
  );
};
