"use client";
import { SegmentedButton } from "@react-md/core/segmented-button/SegmentedButton";
import { SegmentedButtonContainer } from "@react-md/core/segmented-button/SegmentedButtonContainer";
import { CrossFade } from "@react-md/core/transition/CrossFade";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
} from "react";

export default function UsingKeysExample(): ReactElement {
  const [page, setPage] = useState<1 | 2>(1);

  // make it so the appear transition only happens after the first render
  const renderedOnce = useRef(false);
  useEffect(() => {
    renderedOnce.current = true;
  }, []);

  return (
    <>
      <SegmentedButtonContainer>
        <SegmentedButton selected={page === 1} onClick={() => setPage(1)}>
          Page 1
        </SegmentedButton>
        <SegmentedButton selected={page === 2} onClick={() => setPage(2)}>
          Page 2
        </SegmentedButton>
      </SegmentedButtonContainer>
      <CrossFade key={page} appear={renderedOnce.current}>
        {page === 1 ? <Page1 /> : <Page2 />}
      </CrossFade>
    </>
  );
}

const Page1 = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Page1(props, ref) {
    return (
      <TextContainer {...props} ref={ref}>
        <Typography type="headline-4">Page 1</Typography>
        <Typography>
          Nunc dapibus nec neque vitae aliquam. Phasellus eu luctus tortor.
          Morbi et massa lectus. Nam nec posuere urna, nec tincidunt ligula.
          Vestibulum in urna dapibus, rutrum nisi eu, convallis leo. Morbi
          maximus ultricies metus at venenatis. Nulla tincidunt in enim ac
          semper. Maecenas at felis eget dui malesuada placerat eu a dui.
          Vestibulum vel quam egestas turpis commodo euismod ac quis purus.
        </Typography>
      </TextContainer>
    );
  }
);

const Page2 = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Page2(props, ref) {
    return (
      <TextContainer {...props} ref={ref}>
        <Typography type="headline-4">Page 2</Typography>
        <Typography>
          Nullam consectetur rhoncus rhoncus. Nullam cursus porttitor lacus non
          facilisis. Donec tincidunt arcu sollicitudin neque iaculis
          sollicitudin. Vivamus in accumsan turpis. Praesent elementum elit
          vitae risus sollicitudin pretium. Aliquam vitae diam non libero
          efficitur consequat. Ut a porttitor nibh. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
        </Typography>
      </TextContainer>
    );
  }
);
