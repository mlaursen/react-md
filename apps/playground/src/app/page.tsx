"use client";

import { InlineCode } from "@react-md/code/InlineCode";
import { Divider } from "@react-md/core/divider/Divider";
import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import { type ColorScheme } from "@react-md/core/theme/types";
import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { useHtmlClassName } from "@react-md/core/useHtmlClassName";
import { type ReactElement } from "react";

import { Playground } from "./Playground.jsx";

const COLOR_SCHEMES = ["light", "dark", "system"] satisfies ColorScheme[];

export default function Page(): ReactElement {
  const { colorScheme, setColorScheme } = useColorScheme();
  useHtmlClassName(`${colorScheme}-theme`);
  return (
    <>
      <TextContainer>
        <Typography>
          Edit the <InlineCode>src/Playground.tsx</InlineCode> to preview
          changes.
        </Typography>
        <SegmentedButtonContainer>
          {COLOR_SCHEMES.map((scheme) => (
            <SegmentedButton
              key={scheme}
              selected={scheme === colorScheme}
              onClick={() => setColorScheme(scheme)}
            >
              {scheme}
            </SegmentedButton>
          ))}
        </SegmentedButtonContainer>
      </TextContainer>
      <Divider />
      <Playground />
    </>
  );
}
