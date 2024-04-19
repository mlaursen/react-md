import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import {
  WritingDirectionProvider,
  useDir,
} from "@react-md/core/typography/WritingDirectionProvider";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  // try removing the div from this example
  return (
    <WritingDirectionProvider>
      <div>
        <Content />
      </div>
    </WritingDirectionProvider>
  );
}

function Content(): ReactElement {
  const { dir, toggleDir } = useDir();
  return (
    <SegmentedButtonContainer>
      <SegmentedButton
        selected={dir === "ltr"}
        onClick={() => {
          if (dir === "rtl") {
            toggleDir();
          }
        }}
      >
        LTR
      </SegmentedButton>
      <SegmentedButton
        selected={dir === "rtl"}
        onClick={() => {
          if (dir === "ltr") {
            toggleDir();
          }
        }}
      >
        RTL
      </SegmentedButton>
    </SegmentedButtonContainer>
  );
}
