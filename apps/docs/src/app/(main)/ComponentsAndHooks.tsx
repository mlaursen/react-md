import { Link } from "@react-md/core/link/Link";
import { type ReactElement } from "react";

import { HomePageSection } from "./HomePageSection.jsx";
import { Showcase } from "./Showcase.jsx";

export function ComponentsAndHooks(): ReactElement {
  return (
    <HomePageSection
      heading="Components and Hooks"
      paragraph={
        <>
          On top of the powerful styling behavior, there are{" "}
          <strong>100+</strong> components, <strong>60+</strong> hooks, and{" "}
          <strong>40+</strong> utils provided to help speed up development. The
          provided low-level components generally provide simple styles and
          layout while the hooks provide reusable functionality throughout your
          application. More complex widgets will comply with the{" "}
          <Link href="https://www.w3.org/WAI/ARIA/apg/patterns/">
            W3C ARIA authoring practices
          </Link>{" "}
          to enforce the correct screen reader accessibility and keyboard
          movement behavior.
        </>
      }
    >
      <Showcase />
    </HomePageSection>
  );
}
