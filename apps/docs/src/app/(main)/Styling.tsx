import { HighlightedCodeBlock } from "@react-md/code/HighlightedCodeBlock";
import { highlightCode } from "@react-md/code/prismjs/highlight";
import { Link } from "@react-md/core/link/Link";
import { type ReactElement } from "react";
import { HomePageSection } from "./HomePageSection.jsx";

const code = `@use "@react-md/core/colors";
@use "@react-md/core" with (
  $color-scheme: system,
  $primary-color: colors.$teal-500,
  $secondary-color: colors.$pink-a-200,
  $button-text-border-radius: 1rem,
  $button-horizontal-padding: 0.5rem,
  $list-vertical-padding: 0.75rem,
  $list-horizontal-padding: 0.25rem
);

@include core.styles;

.dark-container {
  @include core.theme-set-var(background-color, #212121);
  @include core.theme-set-var(color, #fff);
  @include core.interaction-use-dark-surface;
}
`;

export function Styling(): ReactElement {
  return (
    <HomePageSection
      heading="Styling"
      paragraph={
        <>
          The styles for this library are built from the{" "}
          <Link href="https://material.io/design/">
            material design principals
          </Link>{" "}
          and provided through <Link href="https://sass-lang.com/">Sass</Link>.
          The styles can be configured compile-time by overriding the default
          Sass variables and run-time by using the provided Sass functions and
          mixins to safely update the{" "}
          <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
            custom properties
          </Link>{" "}
          for most components. Colors will automatically be updated to meet a{" "}
          <Link href="https://webaim.org/articles/contrast/#sc143">
            minimum color contrast ratio
          </Link>{" "}
          while overriding default Sass variables and when using the provided
          Sass functions and mixins.
        </>
      }
    >
      <HighlightedCodeBlock language="scss" highlightCode={highlightCode}>
        {code}
      </HighlightedCodeBlock>
    </HomePageSection>
  );
}
