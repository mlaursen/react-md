import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { RootProviders } from "./RootProviders.tsx";
import "./index.scss";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootProviders>
      <App />
    </RootProviders>
  </StrictMode>
);
