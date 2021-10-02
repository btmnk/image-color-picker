import React from "react";
import { BaseLayout } from "./layout/BaseLayout";
import { Landing } from "./pages/landing/Landing";

import "./Theme.css";

export const App: React.FC = () => {
  return (
    <BaseLayout>
      <Landing />
    </BaseLayout>
  );
};
