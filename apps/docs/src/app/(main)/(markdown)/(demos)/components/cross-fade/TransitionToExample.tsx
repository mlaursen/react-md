"use client";

import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import { useCrossFadeTransition } from "@react-md/core/transition/useCrossFadeTransition";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useState } from "react";

export default function TransitionToExample(): ReactElement {
  const [page, setPage] = useState<1 | 2>(1);
  const { elementProps, transitionTo } = useCrossFadeTransition();

  const transitionToPage = (page: 1 | 2): void => {
    setPage(page);
    transitionTo("enter");
  };

  return (
    <>
      <SegmentedButtonContainer>
        <SegmentedButton
          selected={page === 1}
          onClick={() => {
            transitionToPage(1);
          }}
        >
          Page 1
        </SegmentedButton>
        <SegmentedButton
          selected={page === 2}
          onClick={() => {
            transitionToPage(2);
          }}
        >
          Page 2
        </SegmentedButton>
      </SegmentedButtonContainer>
      <TextContainer {...elementProps}>
        {page === 1 ? <Page1 /> : <Page2 />}
      </TextContainer>
    </>
  );
}

function Page1(): ReactElement {
  return (
    <>
      <Typography type="headline-4">Page 1</Typography>
      <Typography>
        Nunc dapibus nec neque vitae aliquam. Phasellus eu luctus tortor. Morbi
        et massa lectus. Nam nec posuere urna, nec tincidunt ligula. Vestibulum
        in urna dapibus, rutrum nisi eu, convallis leo. Morbi maximus ultricies
        metus at venenatis. Nulla tincidunt in enim ac semper. Maecenas at felis
        eget dui malesuada placerat eu a dui. Vestibulum vel quam egestas turpis
        commodo euismod ac quis purus.
      </Typography>
    </>
  );
}

function Page2(): ReactElement {
  return (
    <>
      <Typography type="headline-4">Page 2</Typography>
      <Typography>
        Nullam consectetur rhoncus rhoncus. Nullam cursus porttitor lacus non
        facilisis. Donec tincidunt arcu sollicitudin neque iaculis sollicitudin.
        Vivamus in accumsan turpis. Praesent elementum elit vitae risus
        sollicitudin pretium. Aliquam vitae diam non libero efficitur consequat.
        Ut a porttitor nibh. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas.
      </Typography>
    </>
  );
}
