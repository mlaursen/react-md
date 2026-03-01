import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";

import App from "./App.tsx";
import { RootProviders } from "./RootProviders.tsx";
import { setInitialColorScheme } from "./colorScheme.ts";

setInitialColorScheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootProviders>
      <App />
    </RootProviders>
  </StrictMode>
);
