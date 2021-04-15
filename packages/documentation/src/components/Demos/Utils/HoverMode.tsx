import React, { ReactElement } from "react";
import { Text } from "@react-md/typography";
import { HoverModeProvider } from "@react-md/utils";

import Markdown from "components/Markdown/Markdown";
import WikipediaPreviewLink from "components/WikipediaPreviewLink";

function DesignLanguageDescription(): ReactElement {
  return (
    <Markdown>
      A **design language** or **design vocabulary** is an overarching scheme or
      style that guides the design of a complement of products or architectural
      settings.
    </Markdown>
  );
}

function GoogleNowDescription(): ReactElement {
  return (
    <Markdown>
      **Google Now** was a feature of Google Search of the Google app for
      Android and iOS. Google Now proactively delivered information to users to
      predict (based on search habits and other factors) information they may
      need in the form of informational cards. Google Now branding is no longer
      used, but the functionality continues in the Google app and its feed.
    </Markdown>
  );
}

export default function HoverMode(): ReactElement {
  return (
    // Note: this can be ignored if you are using the `Configuration` component
    // from `@react-md/utils`
    <HoverModeProvider>
      <Text>
        {/* copy/pasted from https://en.wikipedia.org/wiki/Material_Design */}
        <strong>Material Design</strong> (codenamed{" "}
        <strong>Quantum Paper</strong>){" "}
        <WikipediaPreviewLink
          href="https://en.wikipedia.org/wiki/Design_language"
          preview={<DesignLanguageDescription />}
        >
          Design Language
        </WikipediaPreviewLink>{" "}
        {'"card" motifs that debuted in '}
        <WikipediaPreviewLink
          href="https://en.wikipedia.org/wiki/Google_Now"
          preview={<GoogleNowDescription />}
        >
          Google Now
        </WikipediaPreviewLink>{" "}
        , Material Design uses more grid-based layouts, responsive animations
        and transitions, padding, and depth effects such as lighting and
        shadows. Google announced Material Design on June 25, 2014, at the 2014
        Google I/O conference.
      </Text>
    </HoverModeProvider>
  );
}
